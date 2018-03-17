// @flow

import findIndex from 'lodash.findindex';
import AnswerMessage from './AnswerMessage';
import Card from './Card';

const minPosOffset = 10;

class RecallQueue {
  cards: Array<Card>;
  cardsByUuid: Map<string, Card>;
  batchSize: number;
  progressDAO: ProgressDAO;

  // The pointer in the original cards array where we take unseen cards from
  cardsPos: number = 0;

  positionFilters: PositionFilter[] = [
    {
      correctStrike: 0,
      posOffset: 10
    },
    {
      correctStrike: 1,
      posOffset: 100
    },
    {
      correctStrike: 2,
      posOffset: 1000
    }
  ];

  constructor(cards: Array<Card>, progressDAO: ProgressDAO, batchSize: number = 5) {
    if (batchSize >= minPosOffset) {
      throw new Error(`batchSize ${batchSize} should be smaller than minPosOffset ${minPosOffset}`);
    }
    this.cards = cards;
    this.cardsByUuid = this.cards.reduce((acc, card) => acc.set(card.uuid, card), new Map());
    this.batchSize = batchSize;
    this.progressDAO = progressDAO;
  }

  async onCardAnswered(answer: AnswerMessage) {
    const cardUuid = answer.card.uuid;
    const isCorrect = answer.isValid;
    // Update progressByCard
    const progressForCard = await this.progressDAO.getProgress(cardUuid);
    const correctStrikeForCard: number = progressForCard ? progressForCard.correctStrike : 0;
    const updatedProgressForCard: ProgressForCard = {
      lastAnsweredPos: this.progressDAO.getCurrentPos(),
      correctStrike: isCorrect ? correctStrikeForCard + 1 : 0
    };
    await this.progressDAO.setProgress(cardUuid, updatedProgressForCard);
    this.progressDAO.increaseCurrentPos();
  }

  /** 
   * Finds all cards that are egible to learn at the position in the virtual queue. 
   */
  async getCardsDue(pos: number): Promise<Array<Card>> {
    const cardUuids: Array<string> = await this.progressDAO.findCardsWithAnsweredPositionBefore(
      pos,
      this.positionFilters
    );
    return cardUuids.map(cardUuid => this.cardsByUuid.get(cardUuid));
  }

  async getNextCards(cardUuidsInThePipeline?: Array<String> = []): Promise<Array<Card>> {
    // First, get the cards that are due for revision in this batch...
    const nextCards: Array<Card> = (await this.getCardsDue(this.progressDAO.getCurrentPos() + this.batchSize)).filter(
      card => cardUuidsInThePipeline.indexOf(card.uuid) < 0
    );
    // Then, fill up the rest with new cards
    let noMoreSuitableCardsFound = false;
    const learnedCards = await this.progressDAO.getLearnedCards();
    while (nextCards.length < this.batchSize && !noMoreSuitableCardsFound) {
      // Not using ES5 find because we want to provide a start index
      const unseenCardIndex = findIndex(this.cards, card => !learnedCards.includes(card.uuid), this.cardsPos);
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
