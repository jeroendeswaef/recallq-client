// @flow

import base64url from 'base64url';
import Card from './model/Card';

class SoundManager {
  rightAudio = new Audio('/sound/right.mp3');

  onCardAnswered(card: Card, isCorrect: boolean) {
    if (isCorrect) {
      this.rightAudio.play();
    } else {
      const mediaUrlForCard = `https://s3.eu-central-1.amazonaws.com/recallq-sounds/${base64url(card.answer.contentWithArticle)}.mp3`;
      const audio = new Audio(mediaUrlForCard);
      audio.play();
    }
  }
}

export default SoundManager;
