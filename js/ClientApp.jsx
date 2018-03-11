import React from 'react';
import { render } from 'react-dom';

import '../styles/main.scss';

const Trainer = function trainerComponent() {
  return (
    <div className="trainer">
      <div className="trainer__conversation" />
      <div className="trainer__action-bar">
        <input type="text" placeholder="your answer" />
        <button className="button">Answer</button>
      </div>
    </div>
  );
};

render(<Trainer />, document.getElementById('app'));
