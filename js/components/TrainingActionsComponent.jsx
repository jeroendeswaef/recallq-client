import React from 'react';
import MicroEvent from 'microevent';

class TrainingActionsComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.changeEnteredAnswer = this.changeEnteredAnswer.bind(this);
    this.state = {
      enteredAnswer: ''
    };
  }
  handleClick() {
    this.trigger(this.state.enteredAnswer);
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

MicroEvent.mixin(TrainingActionsComponent);

export default TrainingActionsComponent;
