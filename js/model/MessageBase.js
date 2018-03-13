import shortid from 'shortid';

class MessageBase {
  constructor(origin) {
    this.timeStamp = new Date();
    this.uuid = shortid.generate();
    this.origin = origin;
  }
}

export default MessageBase;
