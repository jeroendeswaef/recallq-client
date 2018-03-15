// @flow

import { observable, computed, toJS } from 'mobx';
import MicroEvent from 'microevent';
import { PropTypes } from 'mobx-react';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';
import QuestionMessage from './model/QuestionMessage';
import Card from './model/Card';
import MessageBase from './model/MessageBase';
import cardPicker from './cardPicker';

const specialCharactersLength = 7;

class TrainingStore {
  @observable messages: PropTypes.observable<MessageBase>;
  upcomingSpecialCharacters = observable.array([]);
  cards: Array<Card>;
  currentCard: ?Card;

  constructor(initialMessages: string[], cards: Array<Card>) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    this.cards = cards;
    cardPicker.pickCards().then(newCards => {
      this.cards = newCards;
      window.cards = newCards;
      this.askNextQuestion();
    });
    this.currentCard = null;
  }

  askNextQuestion = () => {
    if (this.cards.length > 0) {
      this.currentCard = this.cards.shift();
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
          while (newSpecialCharactersSet.size < specialCharactersLength) {
            newSpecialCharactersSet.add(specialCharactersForAllCards[i]);
            i += 1;
          }
          this.upcomingSpecialCharacters.replace(Array.from(newSpecialCharactersSet).sort());
        });
      }
    }
  };

  answer(msg: string) {
    if (!this.currentCard) throw new Error('Trying to answer, but no current card');
    const answer = new AnswerMessage(msg, this.currentCard);
    this.trigger('answered', answer.card, answer.isValid);
    this.messages.push(answer);
    this.askNextQuestion();
  }
}

MicroEvent.mixin(TrainingStore);

export default TrainingStore;
