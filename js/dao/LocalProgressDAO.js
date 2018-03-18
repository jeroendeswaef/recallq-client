// @flow

export default class LocalProgressDAO {
  progressByCard: Map<string, ProgressForCard> = new Map();
  currentPos: number = 0;

  setProgress(cardUuid: string, progress: ProgressForCard): Promise<void> {
    this.progressByCard.set(cardUuid, progress);
    return Promise.resolve();
  }

  getProgress(cardUuid: string): Promise<?ProgressForCard> {
    return Promise.resolve(this.progressByCard.get(cardUuid));
  }

  findCardsWithAnsweredPositionBefore(pos: number, positionFilters: Array<PositionFilter>): Promise<Array<string>> {
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
    return Promise.resolve(cardUuids);
  }
  getLearnedCards(): Promise<Array<string>> {
    return Promise.resolve(Array.from(this.progressByCard.keys()));
  }
  getCurrentPos(): number {
    return this.currentPos;
  }
  increaseCurrentPos() {
    this.currentPos += 1;
  }
}
