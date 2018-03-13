// @flow

import MessageBase from './MessageBase';
import Card from './Card';

class AnswerMessage extends MessageBase {
  card: Card;
  isValid: boolean;

  constructor(text: string, card: Card) {
    super(text, 'answer');
    this.card = card;
    this.isValid = card.validateAnswer(text).isValid;
    this.correctedText = card.answerText;
  }
}

export default AnswerMessage;
