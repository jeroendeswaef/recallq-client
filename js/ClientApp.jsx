import React from 'react';
import { render } from 'react-dom';
import { shape, string, arrayOf } from 'prop-types';

import '../styles/main.scss';

import cards from '../cards.json';

const Trainer = function trainerComponent(props) {
  return (
    <div className="trainer">
      <div className="trainer__conversation">
        <ol>
          {props.cards.map(card => (
            <li key={card.uuid} className="speech-bubble"><span>{card.answer.content}</span></li>
          ))}
        </ol>
      </div>
      <div className="trainer__action-bar">
        <input type="text" placeholder="your answer" />
        <button className="button">Answer</button>
      </div>
    </div>
  );
};

Trainer.propTypes = shape({
  cards: arrayOf(
    shape({
      answer: shape({
        content: string.isRequired,
        contentType: string.isRequired,
        gender: string.isRequired,
        grammarType: string.isRequired,
        language: string.isRequired
      }).isRequired,
      question: shape({
        content: string.isRequired,
        language: string.isRequired
      }).isRequired,
      uuid: string.isRequired
    }).isRequired
  ).isRequired
}).isRequired;

render(<Trainer cards={cards} />, document.getElementById('app'));
