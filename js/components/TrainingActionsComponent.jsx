import React from 'react';
import { shape, func } from 'prop-types';

class TrainingActionsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeEnteredAnswer = this.changeEnteredAnswer.bind(this);
    this.state = {
      enteredAnswer: '',
      answer: props.answer
    };
  }
  handleClick() {
    this.state.answer(this.state.enteredAnswer);
    this.setState({ enteredAnswer: '' });
  }
  changeEnteredAnswer(event) {
    this.setState({ enteredAnswer: event.currentTarget.value });
  }

  render() {
    return (
      <div className="trainer__action-bar">
        <input
          value={this.state.enteredAnswer}
          onChange={this.changeEnteredAnswer}
          type="text"
          placeholder="your answer"
        />
        <button className="button" onClick={this.handleClick}>Answer</button>
      </div>
    );
  }
}

TrainingActionsComponent.propTypes = shape({
  answer: func.isRequired
}).isRequired;

export default TrainingActionsComponent;
