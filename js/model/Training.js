import SystemMessage from './SystemMessage';
import AnswerMessage from './AnswerMessage';

/** 
 * This class is responsible for generating a list of messages as the training session progresses.
 */
class Training {
  constructor(initialMessages) {
    this.messages = (initialMessages || []).map(msg => new SystemMessage(msg));
  }

  answer(msg) {
    this.messages.push(new AnswerMessage(msg));
  }

  getMessages() {
    return this.messages;
  }
}

export default Training;
