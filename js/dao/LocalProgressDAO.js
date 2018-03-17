// @flow

export default class LocalProgressDAO {
  progressByCard: Map<string, ProgressForCard> = new Map();
  currentPos: number = 0;

  setProgress(cardUuid: string, progress: ProgressForCard) {
    this.progressByCard.set(cardUuid, progress);
  }

  getProgress(cardUuid: string): ?ProgressForCard {
    return this.progressByCard.get(cardUuid);
  }

  findCardsWithAnsweredPositionBefore(pos: number, positionFilters: Array<PositionFilter>): Array<string> {
    const cardUuids = [];
    this.progressByCard.forEach((progressForCard, cardUuid) => {
      for (let i = 0; i < positionFilters.length; i += 1) {
        if (progressForCard.correctStrike === positionFilters[i].correctStrike) {
          if (progressForCard.lastAnsweredPos + positionFilters[i].posOffset < pos) {
            cardUuids.push(cardUuid);
          }
        }
      }
    });
    return cardUuids;
  }
  getLearnedCards(): Array<string> {
    return Array.from(this.progressByCard.keys());
  }
  getCurrentPos(): number {
    return this.currentPos;
  }
  increaseCurrentPos() {
    this.currentPos += 1;
  }
}
