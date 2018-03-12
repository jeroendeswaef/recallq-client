import { observable, computed } from 'mobx';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class TrainingStore {
  @observable messages;

  constructor(initialMessages, cards) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    this.cards = cards;
    this.currentCard = undefined;
    this.askNextQuestion();
    // autorun(() => console.log(this.report));
  }

  askNextQuestion = () => {
    this.currentCard = this.cards[getRandomArbitrary(0, this.cards.length)];
    this.messages.push(new SystemMessage(this.currentCard.question.content));
  };

  showCorrectAnswer = () => {
    this.messages.push(new SystemMessage(this.currentCard.answer.content));
  };

  @computed get report() {
    if (this.messages.length === 0) return '<none>';
    return `${this.messages.length} messages`;
  }

  answer(msg) {
    this.messages.push(new AnswerMessage(msg));
    this.showCorrectAnswer();
    this.askNextQuestion();
  }
}

export default TrainingStore;
