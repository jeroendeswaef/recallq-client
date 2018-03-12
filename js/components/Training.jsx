import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { observer } from 'mobx-react';
import MessageComponent from './Message';
import TrainingActionsComponent from './TrainingActionsComponent';

@observer class TrainingComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.answer = this.answer.bind(this);
    this.state = {
      store: props.store
    };
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  answer(msg) {
    this.state.store.answer(msg);
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    return (
      <div className="trainer">
        <div className="trainer__conversation-parent">
          <div className="trainer__conversation">
            <ol>
              {this.props.store.messages.map(message => <MessageComponent key={message.uuid} {...message} />)}
            </ol>
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
        </div>
        <TrainingActionsComponent answer={this.answer} />
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
