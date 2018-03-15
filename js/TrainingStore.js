// @flow

import { observable, computed } from 'mobx';
import { PropTypes } from 'mobx-react';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';
import QuestionMessage from './model/QuestionMessage';
import Card from './model/Card';
import MessageBase from './model/MessageBase';
import cardPicker from './cardPicker';

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class TrainingStore {
  @observable messages: PropTypes.observable<MessageBase>;
  upcomingSpecialCharacters = observable.array(['é', 'è', 'ï', 'î', 'â', 'û', 'ç', 'ô', 'ê', 'à'].slice(0, 5));
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
      this.currentCard = this.cards[getRandomArbitrary(0, this.cards.length)];
      this.messages.push(new QuestionMessage(this.currentCard));
      /* this.upcomingSpecialCharacters.replace(
        this.currentCard ? Array.from(this.currentCard.answer.specialCharacters) : []
      ); */
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
