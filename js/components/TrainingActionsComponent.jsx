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

  render() {
    console.info('TAC rerender');
    return (
      <div>
        {this.props.upcomingSpecialCharacters
          .sort()
          .map(character => <button key={character} className="button button-outline">{character}</button>)}
        <form onSubmit={this.handleAnswer} className="trainer__action-bar">
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
