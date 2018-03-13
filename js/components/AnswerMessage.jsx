import React from 'react';

export default (props: { uuid: string, origin: string, text: string, correctedText: string, isValid: boolean }) => (
  <li
    key={props.uuid}
    className={`trainer__conversation__message speech-bubble--${props.origin === 'system' ? 'system' : 'user'} ${props.isValid ? 'correct' : 'incorrect'}`}
  >
    {props.text.length > 0 ? <span className="proposed-answer">{props.text}</span> : null}
    {!props.isValid ? <span className="corrected-answer">{props.correctedText}</span> : null}
  </li>
);
