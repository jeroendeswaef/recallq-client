import MessageBase from './MessageBase';

class SystemMessage extends MessageBase {
  constructor(text) {
    super(text, 'system');
  }
}

export default SystemMessage;
