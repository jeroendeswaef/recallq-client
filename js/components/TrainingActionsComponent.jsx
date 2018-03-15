// @flow

import React from 'react';
import { observer, PropTypes } from 'mobx-react';

interface TrainingActionsProps {
  answer: string => void,
  upcomingSpecialCharacters: PropTypes.observable<string>
}
@observer class TrainingActionsComponent extends React.PureComponent<TrainingActionsProps, {}> {
  // eslint-disable-next-line no-useless-constructor
  constructor(props: TrainingActionsProps) {
    super(props);
  }
  input: HTMLInputElement;
  handleAnswer = (event: Event) => {
    // To prevent the submit from submitting the page
    event.preventDefault();
    this.props.answer(this.input.value);
    this.input.value = '';
    this.input.focus();
  };

  handleSpecialCharacter = (event: Event) => {
    if (!(event.currentTarget instanceof HTMLButtonElement)) throw new Error('Expected button for special character');
    const buttonElement: HTMLButtonElement = event.currentTarget;
    const specialCharacter = buttonElement.getAttribute('data-character');
    if (specialCharacter) {
      this.input.value = `${this.input.value}${specialCharacter}`;
      this.input.focus();
    }
  };

  render() {
    return (
      <div className="trainer__action-bar">
        <div className="trainer__action-bar__characters">
          {this.props.upcomingSpecialCharacters.sort().map(character => (
            <button
              key={character}
              onClick={this.handleSpecialCharacter}
              data-character={character}
              className="button button-outline"
            >
              {character}
            </button>
          ))}
        </div>
        <form onSubmit={this.handleAnswer} className="trainer__action-bar__message-actions">
          <input
            type="text"
            placeholder="your answer"
            ref={(input: ?HTMLInputElement) => {
              if (input) this.input = input;
            }}
          />
          <button type="submit" className="button">Answer</button>
        </form>
      </div>
    );
  }
}

export default TrainingActionsComponent;
