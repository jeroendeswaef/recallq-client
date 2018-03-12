import React from 'react';
import { shape, func } from 'prop-types';

class TrainingActionsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      enteredAnswer: '',
      answer: props.answer
    };
  }
  handleAnswer = event => {
    // To prevent the submit from submitting the page
    event.preventDefault();
    this.state.answer(this.state.enteredAnswer);
    this.setState({ enteredAnswer: '' });
  };
  changeEnteredAnswer = event => {
    this.setState({ enteredAnswer: event.currentTarget.value });
  };

  render() {
    return (
      <form onSubmit={this.handleAnswer} className="trainer__action-bar">
        <input
          value={this.state.enteredAnswer}
          onChange={this.changeEnteredAnswer}
          type="text"
          placeholder="your answer"
        />
        <button type="submit" className="button">Answer</button>
      </form>
    );
  }
}

TrainingActionsComponent.propTypes = shape({
  answer: func.isRequired
}).isRequired;

export default TrainingActionsComponent;
