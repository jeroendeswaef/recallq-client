import React from 'react';

export default (props: { uuid: string, text: string }) => (
  <li key={props.uuid} className="trainer__conversation__message speech-bubble--system">
    {props.text}
  </li>
);
