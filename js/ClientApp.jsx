import React from 'react';
import { render } from 'react-dom';
import { shape, string, arrayOf } from 'prop-types';
import SystemMessage from './model/SystemMessage';
import MessageComponent from './components/Message';

import '../styles/main.scss';

import cards from '../cards.json';

class Trainer extends React.Component {
  constructor(props) {
    super(props);
    const message = new SystemMessage("Let's learn some french! 🇫🇷");
    this.state = {
      cards: props.cards,
      messages: [message]
    };
  }
  render() {
    return (
      <div className="trainer">
        <div className="trainer__conversation-parent">
          <div className="trainer__conversation">
            <ol>
              {this.state.messages.map(message => <MessageComponent message={message} />)}
            </ol>
          </div>
        </div>
        <div className="trainer__action-bar">
          <input type="text" placeholder="your answer" />
          <button className="button">Answer</button>
        </div>
      </div>
    );
  }
}
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
