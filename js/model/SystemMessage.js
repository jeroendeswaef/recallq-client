import MessageBase from './MessageBase';

class SystemMessage extends MessageBase {
  constructor(text) {
    super('system');
    this.text = text;
  }
}

export default SystemMessage;
