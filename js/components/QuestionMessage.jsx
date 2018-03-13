// @flow

import React from 'react';
import shortid from 'shortid';

const QuestionMessage = (props: { questionItems: Array<string> }) => (
  <li className="trainer__conversation__message speech-bubble--system">
    {props.questionItems.map((str: string) => (
      <span key={shortid.generate()} className="question-item"><q>{str}</q></span>
    ))}
  </li>
);

export default QuestionMessage;
