import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import MessageComponent from './Message';
import TrainingActionsComponent from './TrainingActionsComponent';

class TrainingComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    };
  }
  render() {
    return (
      <div className="trainer">
        <div className="trainer__conversation-parent">
          <div className="trainer__conversation">
            <ol>
              {this.state.messages.map(message => <MessageComponent key={message.uuid} message={message} />)}
            </ol>
          </div>
        </div>
        <TrainingActionsComponent />
      </div>
    );
  }
}

TrainingComponent.propTypes = arrayOf(
  shape({
    origin: string.isRequired,
    text: string.isRequired,
    timeStamp: string.isRequired,
    uuid: string.isRequired
  }).isRequired
).isRequired;

export default TrainingComponent;
