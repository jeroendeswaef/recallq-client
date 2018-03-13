// @flow

import React from 'react';
import Card from '../model/Card';

export default (props: { uuid: string, card: Card }) => 
  // console.info(props.card.questionItemsWithArticle);
   (
    <li key={props.uuid} className="trainer__conversation__message speech-bubble--system">
      {/* props.card.questionItemsWithArticle.map(str => <div key={uuidv3(str, props.card.uuid)}>{str}</div>) */}
      {props.card.questionItemsWithArticle[0]}
    </li>
  );
