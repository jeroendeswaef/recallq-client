import uuid from 'uuid/v3';

const MESSAGE_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

class MessageBase {
  constructor(text, origin) {
    this.timeStamp = new Date();
    this.uuid = uuid(`${text}-${this.timeStamp}`, MESSAGE_NAMESPACE);
    this.text = text;
    this.origin = origin;
  }
}

export default MessageBase;
