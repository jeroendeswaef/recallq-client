import React from 'react';
import { render } from 'react-dom';

const Trainer = function trainerComponent() {
  return <div className="trainer" />;
};

render(<Trainer />, document.getElementById('app'));
