import React from 'react';
import { shape, string, oneOf } from 'prop-types';

const MessageComponent = props => (
  <li key={props.message.uuid} className="speech-bubble"><span>{props.message.text}</span></li>
);

MessageComponent.propTypes = shape({
  origin: oneOf(['system', 'answer']).isRequired,
  text: string.isRequired,
  timeStamp: string.isRequired,
  uuid: string.isRequired
}).isRequired;

export default MessageComponent;
