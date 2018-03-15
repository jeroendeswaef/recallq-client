import React from 'react';
import { shape, func } from 'prop-types';

class TrainingActionsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer
    };
  }
  handleAnswer = event => {
    // To prevent the submit from submitting the page
    event.preventDefault();
    this.state.answer(this.input.value);
    this.input.value = '';
    this.input.focus();
  };

  render() {
    console.info('TAC rerender');
    return (
      <div>
        {['é', 'è', 'ï', 'î', 'â', 'û', 'ç', 'ô', 'ê', 'à']
          .sort()
          .map(character => <button className="button button-outline">{character}</button>)}
        <form onSubmit={this.handleAnswer} className="trainer__action-bar">
          <input
            type="text"
            placeholder="your answer"
            ref={input => {
              this.input = input;
            }}
          />
          <button type="submit" className="button">Answer</button>
        </form>
      </div>
    );
  }
}

TrainingActionsComponent.propTypes = shape({
  answer: func.isRequired
}).isRequired;

export default TrainingActionsComponent;
