// @flow

import base64url from 'base64url';
import AnswerMessage from './model/AnswerMessage';

class SoundManager {
  rightAudio = new Audio('/sound/right.mp3');

  onCardAnswered(answer: AnswerMessage) {
    if (answer.isValid) {
      this.rightAudio.play();
    } else {
      const { card } = answer;
      const mediaUrlForCard = `https://s3.eu-central-1.amazonaws.com/recallq-sounds/${base64url(card.answer.contentWithArticle)}.mp3`;
      const audio = new Audio(mediaUrlForCard);
      audio.play();
    }
  }
}

export default SoundManager;
