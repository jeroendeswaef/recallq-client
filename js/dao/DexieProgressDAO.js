// @flow
import Dexie from 'dexie';

const POSITION_KEY = 'recallQPos';

export default class DexieProgressDAO {
  db: Dexie;
  currentPos: number = 0;

  constructor() {
    this.db = new Dexie('recallqDb');
    this.db.version(1).stores({
      progress: 'cardUuid,correctStrike,lastAnsweredPos'
    });
    const savedPos = localStorage.getItem(POSITION_KEY);
    if (savedPos) {
      this.currentPos = parseInt(savedPos, 10);
    }
  }

  async setProgress(cardUuid: string, progress: ProgressForCard) {
    return this.db.progress.put({
      cardUuid,
      correctStrike: progress.correctStrike,
      lastAnsweredPos: progress.lastAnsweredPos
    });
  }

  async getProgress(cardUuid: string): Promise<?ProgressForCard> {
    return this.db.progress.where('cardUuid').equals(cardUuid);
  }

  async findCardsWithAnsweredPositionBefore(
    pos: number,
    positionFilters: Array<PositionFilter>
  ): Promise<Array<string>> {
    const cardUuids = Array.from(
      await positionFilters.reduce(async (acc: Set<string>, positionFilter) => {
        const res = await this.db.progress
          .where('lastAnsweredPos')
          .below(pos - positionFilter.posOffset)
          .and(value => value.correctStrike === positionFilter.correctStrike)
          .primaryKeys();
        res.forEach(cardUuid => acc.add(cardUuid));
        return acc;
      }, new Set())
    );
    return cardUuids;
  }
  async getLearnedCards(): Promise<Array<string>> {
    return this.db.progress.orderBy('cardUuid').primaryKeys();
  }
  getCurrentPos(): number {
    return this.currentPos;
  }
  increaseCurrentPos() {
    this.currentPos += 1;
    localStorage.setItem(POSITION_KEY, `${this.currentPos}`);
  }
}
