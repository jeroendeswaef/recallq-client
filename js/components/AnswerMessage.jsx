// @flow

import React from 'react';

export default (props: { text: string, correctedText: string, isValid: boolean }) => {
  console.info(props.text);
  return (
    <li className={`trainer__conversation__message speech-bubble--user ${props.isValid ? 'correct' : 'incorrect'}`}>
      {props.text.length > 0 ? <span className="proposed-answer">{props.text}</span> : null}
      {!props.isValid ? <span className="corrected-answer">{props.correctedText}</span> : null}
    </li>
  );
};
