import MessageBase from './MessageBase';

class AnswerMessage extends MessageBase {
  constructor(text) {
    super(text, 'answer');
  }
}

export default AnswerMessage;
