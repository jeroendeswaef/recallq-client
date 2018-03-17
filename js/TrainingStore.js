// @flow

import { observable, toJS } from 'mobx';
import MicroEvent from 'microevent';
import { PropTypes } from 'mobx-react';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';
import QuestionMessage from './model/QuestionMessage';
import Card from './model/Card';
import MessageBase from './model/MessageBase';
import cardPicker from './cardPicker';
import RecallQueue from './model/RecallQueue';
import DexieProgressDAO from './dao/DexieProgressDAO';

// How many special character buttons to show
const specialCharactersLength = 7;

class TrainingStore {
  @observable messages: PropTypes.observable<MessageBase>;
  upcomingSpecialCharacters = observable.array([]);
  currentCard: ?Card;
  upcomingCards: Array<Card> = [];
  recallQueue: RecallQueue;

  constructor(initialMessages: string[]) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    cardPicker.pickCards().then(async cards => {
      this.recallQueue = new RecallQueue(cards, new DexieProgressDAO());
      this.upcomingCards = await this.recallQueue.getNextCards();
      await this.askNextQuestion();
    });
    this.currentCard = null;
  }

  askNextQuestion = async () => {
    // Keeping a small buffer of minimum 2 cards at all time to be able to do prefetching
    if (this.upcomingCards.length < 3) {
      this.upcomingCards = [
        ...this.upcomingCards,
        ...(await this.recallQueue.getNextCards(this.upcomingCards.map(card => card.uuid)))
      ];
    }
    if (this.upcomingCards.length > 0) {
      this.currentCard = this.upcomingCards.shift();
      this.messages.push(new QuestionMessage(this.currentCard));
      const requiredSpecialCharactersSet = this.currentCard ? this.currentCard.answer.specialCharacters : new Set();
      if (
        this.upcomingSpecialCharacters.length < specialCharactersLength ||
        !Array.from(requiredSpecialCharactersSet).every(
          upcomingSpecialCharacter => toJS(this.upcomingSpecialCharacters).indexOf(upcomingSpecialCharacter) > -1
        )
      ) {
        cardPicker.getSpecialCharactersForAllCards().then(specialCharactersForAllCardsSet => {
          const specialCharactersForAllCards = Array.from(specialCharactersForAllCardsSet);
          let i = 0;
          const newSpecialCharactersSet = requiredSpecialCharactersSet;
          while (newSpecialCharactersSet.size < specialCharactersLength && i < specialCharactersForAllCards.length) {
            newSpecialCharactersSet.add(specialCharactersForAllCards[i]);
            i += 1;
          }
          this.upcomingSpecialCharacters.replace(Array.from(newSpecialCharactersSet).sort());
        });
      }
    }
  };

  // implemented by the microevent library.
  // eslint-disable-next-line class-methods-use-this,no-unused-vars
  trigger(type: string, answer: AnswerMessage) {}

  async answer(msg: string) {
    if (!this.currentCard) throw new Error('Trying to answer, but no current card');
    const answer = new AnswerMessage(msg, this.currentCard);
    this.trigger('answered', answer);
    await this.recallQueue.onCardAnswered(answer);
    this.messages.push(answer);
    await this.askNextQuestion();
  }
}

MicroEvent.mixin(TrainingStore);

export default TrainingStore;
