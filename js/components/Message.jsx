import React from 'react';
import { shape, string, boolean, oneOf } from 'prop-types';

const MessageComponent = props => (
  <li
    key={props.uuid}
    className={`speech-bubble--${props.origin === 'system' ? 'system' : 'user'} ${props.isValid ? 'correct' : 'incorrect'}`}
  >
    <span>{props.text}</span>
  </li>
);

MessageComponent.propTypes = shape({
  origin: oneOf(['system', 'answer']).isRequired,
  text: string.isRequired,
  timeStamp: string.isRequired,
  uuid: string.isRequired,
  isValid: boolean
}).isRequired;

export default MessageComponent;
