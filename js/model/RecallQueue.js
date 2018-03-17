// @flow

import findIndex from 'lodash.findindex';
import AnswerMessage from './AnswerMessage';
import Card from './Card';

declare type ProgressForCard = {
  // The position in the virtual queue on which a card was last answered
  lastAnsweredPos: number,
  outOfThree: Array<boolean>
};

const minPosOffset = 10;

class RecallQueue {
  cards: Array<Card>;
  cardsByUuid: Map<string, Card>;
  batchSize: number;
  // The pointer in the infinitely growing virtual queue
  currentPos: number = 0;
  // The pointer in the original cards array where we take unseen cards from
  cardsPos: number = 0;
  progressByCard: Map<string, ProgressForCard> = new Map();
  constructor(cards: Array<Card>, batchSize: number = 5) {
    if (batchSize >= minPosOffset) {
      throw new Error(`batchSize ${batchSize} should be smaller than minPosOffset ${minPosOffset}`);
    }
    this.cards = cards;
    this.cardsByUuid = this.cards.reduce((acc, card) => acc.set(card.uuid, card), new Map());
    this.batchSize = batchSize;
  }

  onCardAnswered(answer: AnswerMessage) {
    const cardUuid = answer.card.uuid;
    const isCorrect = answer.isValid;
    // Update progressByCard
    const outOfTreeForCard: Array<boolean> = this.progressByCard[cardUuid]
      ? this.progressByCard[cardUuid].outOfThree
      : [];
    outOfTreeForCard.unshift(isCorrect);
    const progressForCard: ProgressForCard = {
      lastAnsweredPos: this.currentPos,
      outOfThree: outOfTreeForCard.slice(0, 3)
    };
    this.progressByCard.set(cardUuid, progressForCard);
    this.currentPos += 1;
  }

  /** 
   * Finds all cards that are egible to learn at the position in the virtual queue. 
   */
  getCardsDue(pos: number): Array<Card> {
    const cardsAtPosition = [];
    this.progressByCard.forEach((progressForCard, cardUuid) => {
      const outOfThreeScoreForCard = progressForCard.outOfThree.filter(value => value === true).length;
      if (progressForCard.lastAnsweredPos + 10 ** (outOfThreeScoreForCard + 1) < pos) {
        cardsAtPosition.push(this.cardsByUuid.get(cardUuid));
      }
    });
    return cardsAtPosition;
  }

  getNextCards(cardUuidsInThePipeline?: Array<String> = []): Array<Card> {
    // First, get the cards that are due for revision in this batch...
    const nextCards: Array<Card> = this.getCardsDue(this.currentPos + this.batchSize).filter(
      card => cardUuidsInThePipeline.indexOf(card.uuid) < 0
    );
    // Then, fill up the rest with new cards
    let noMoreSuitableCardsFound = false;
    while (nextCards.length < this.batchSize && !noMoreSuitableCardsFound) {
      // Not using ES5 find because we want to provide a start index
      const unseenCardIndex = findIndex(this.cards, card => !this.progressByCard.has(card.uuid), this.cardsPos);
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
