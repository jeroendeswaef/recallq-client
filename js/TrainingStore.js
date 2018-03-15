// @flow

import { observable, computed, toJS } from 'mobx';
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
  wrongAudio: Audio;

  constructor(initialMessages: string[], cards: Array<Card>) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    this.cards = cards;
    cardPicker.pickCards().then(newCards => {
      this.cards = newCards;
      this.askNextQuestion();
    });
    this.currentCard = null;
    // this.askNextQuestion();
    this.wrongAudio = new Audio('/public/sound/wrong.mp3');
    // autorun(() => console.log(this.report));
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

  showCorrectAnswer = () => {
    this.wrongAudio.play();
    // this.messages.push(new SystemMessage(this.currentCard.answer.content));
  };

  @computed get report(): string {
    if (this.messages.length === 0) return '<none>';
    return `${this.messages.length} messages`;
  }

  answer(msg: string) {
    if (!this.currentCard) throw new Error('Trying to answer, but no current card');
    const answer = new AnswerMessage(msg, this.currentCard);
    this.messages.push(answer);
    // this.showCorrectAnswer();
    this.askNextQuestion();
  }
}

export default TrainingStore;
