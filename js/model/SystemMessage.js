import uuid from 'uuid/v3';

const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

class SystemMessage {
  constructor(text) {
    this.timeStamp = new Date();
    this.uuid = uuid(`${text}-${this.timeStamp}`, MY_NAMESPACE);
    this.text = text;
    this.origin = 'system';
  }
}

export default SystemMessage;
