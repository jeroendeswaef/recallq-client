// @flow

import { observable, computed } from 'mobx';
import { PropTypes } from 'mobx-react';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';
import Card from './model/Card';
import MessageBase from './model/MessageBase';

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class TrainingStore {
  @observable messages: PropTypes.observable<MessageBase>;
  cards: Array<Card>;
  currentCard: ?Card;
  wrongAudio: Audio;

  constructor(initialMessages: string[], cards: Array<Card>) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    this.cards = cards;
    this.currentCard = null;
    this.askNextQuestion();
    this.wrongAudio = new Audio('/public/sound/wrong.mp3');
    // autorun(() => console.log(this.report));
  }

  askNextQuestion = () => {
    this.currentCard = this.cards[getRandomArbitrary(0, this.cards.length)];
    this.messages.push(new SystemMessage(`"${this.currentCard.questionText}"`));
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
