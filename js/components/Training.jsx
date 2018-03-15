// @flow

import React from 'react';
import { string, arrayOf, shape } from 'prop-types';
import { observer } from 'mobx-react';
import AnswerMessage from '../model/AnswerMessage';
import SystemMessageComponent from './SystemMessage';
import AnswerMessageComponent from './AnswerMessage';
import QuestionMessageComponent from './QuestionMessage';
import TrainingActionsComponent from './TrainingActionsComponent';
import MessageBase from '../model/MessageBase';
import QuestionMessage from '../model/QuestionMessage';

@observer class TrainingComponent extends React.PureComponent {
  static renderMessage(message: MessageBase) {
    if (message instanceof AnswerMessage) {
      return (
        <AnswerMessageComponent
          key={message.uuid}
          text={message.text}
          correctedText={message.correctedText}
          isValid={message.isValid}
        />
      );
    } else if (message instanceof QuestionMessage) {
      const questionMessage: QuestionMessage = message;
      return (
        <QuestionMessageComponent key={message.uuid} questionItems={questionMessage.card.questionItemsWithArticle} />
      );
    }
    return <SystemMessageComponent key={message.uuid} {...message} />;
  }

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
              {this.props.store.messages.map(message => this.constructor.renderMessage(message))}
            </ol>
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
        </div>
        <TrainingActionsComponent
          answer={this.answer}
          upcomingSpecialCharacters={this.props.store.upcomingSpecialCharacters}
        />
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
