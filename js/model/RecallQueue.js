// @flow

import findIndex from 'lodash.findindex';
import AnswerMessage from './AnswerMessage';
import Card from './Card';

const minPosOffset = 10;

class RecallQueue {
  cards: Array<Card>;
  batchSize: number;
  // The pointer in the infinitely growing virtual queue
  currentPos: number = 0;
  // The pointer in the original cards array where we take unseen cards from
  cardsPos: number = 0;
  positionsByCard: Map<string, number> = new Map();

  constructor(cards: Array<Card>, batchSize: number = 5) {
    if (batchSize >= minPosOffset) {
      throw new Error(`batchSize ${batchSize} should be smaller than minPosOffset ${minPosOffset}`);
    }
    this.cards = cards;
    this.batchSize = batchSize;
  }

  onCardAnswered(answer: AnswerMessage) {}

  getNextCards(): Array<Card> {
    const nextCards: Array<Card> = [];
    // TODO check positionsByCard
    let noMoreSuitableCardsFound = false;
    while (nextCards.length < this.batchSize && !noMoreSuitableCardsFound) {
      // Not using ES5 find because we want to provide a start index
      const unseenCardIndex = findIndex(this.cards, card => !this.positionsByCard.has(card.uuid), this.cardsPos);
      if (unseenCardIndex > -1) {
        this.cardsPos = unseenCardIndex + 1;
        const unseenCard = this.cards[unseenCardIndex];
        nextCards.push(unseenCard);
      } else {
        noMoreSuitableCardsFound = true;
      }
    }
    return nextCards;
  }
}

export default RecallQueue;
