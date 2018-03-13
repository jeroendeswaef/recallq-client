// @flow

import MessageBase from './MessageBase';
import Card from './Card';

class QuestionMessage extends MessageBase {
  card: Card;

  constructor(card: Card) {
    super('', 'system');
    this.card = card;
  }
}

export default QuestionMessage;
