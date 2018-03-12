import { observable, computed } from 'mobx';
import SystemMessage from './model/SystemMessage';
import AnswerMessage from './model/AnswerMessage';

class TrainingStore {
  @observable messages;

  constructor(initialMessages) {
    this.messages = observable.array((initialMessages || []).map(msg => new SystemMessage(msg)));
    // autorun(() => console.log(this.report));
  }

  @computed get report() {
    if (this.messages.length === 0) return '<none>';
    return `${this.messages.length} messages`;
  }

  answer(msg) {
    this.messages.push(new AnswerMessage(msg));
  }
}

export default TrainingStore;
