// @flow

import React from 'react';

const AnswerMessage = (props: { text: string, correctedText: string, isValid: boolean }) => (
    <li className={`trainer__conversation__message speech-bubble--user ${props.isValid ? 'correct' : 'incorrect'}`}>
      {props.text.length > 0 ? <span className="proposed-answer">{props.text}</span> : null}
      {!props.isValid ? <span className="corrected-answer">{props.correctedText}</span> : null}
    </li>
  );

export default AnswerMessage;
