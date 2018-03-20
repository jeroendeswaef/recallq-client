// @flow
/* eslint-disable no-underscore-dangle */

import PouchDB from 'pouchdb-browser';
import PouchdbFind from 'pouchdb-find';

export default class PouchDbProgressDAO {
  db: PouchDB;
  revsByCardUuid: Map<string, string> = new Map();
  currentPosRev: ?string;
  currentPos: ?number;
  isInitialized: boolean = false;
  constructor() {
    PouchDB.plugin(PouchdbFind);
  }
  async initialize() {
    if (this.isInitialized) return Promise.resolve();
    this.db = new PouchDB('recallQDb');
    await this.db.createIndex({
      index: {
        fields: ['lastAnsweredPos', 'correctStrike']
      }
    });
    await this.db
      .get('currentPos')
      .then(queryRes => {
        if (!isNaN(queryRes.value)) {
          this.currentPos = queryRes.value;
        } else {
          this.currentPos = 0;
        }
        this.currentPosRev = queryRes._rev;
      })
      .catch(ex => {
        if (ex.status === 404) {
          this.currentPos = 0;
        } else {
          console.error(ex);
        }
      });
    this.isInitialized = true;
  }

  async setProgress(cardUuid: string, progress: ProgressForCard): Promise<void> {
    await this.initialize();
    const res = await this.db.put(
      Object.assign(
        {
          _id: cardUuid,
          _rev: this.revsByCardUuid.get(cardUuid),
          correctStrike: null,
          lastAnsweredPos: null
        },
        progress
      )
    );
    return res;
  }

  async getProgress(cardUuid: string): Promise<?ProgressForCard> {
    await this.initialize();
    const res = await this.db.get(cardUuid).then(queryRes => Promise.resolve(queryRes)).catch(ex => {
      if (ex.status === 404) {
        return Promise.resolve(null);
      }
      return Promise.reject(ex);
    });
    if (res) {
      this.revsByCardUuid.set(cardUuid, res._rev);
    }
    return res;
  }

  async findCardsWithAnsweredPositionBefore(
    pos: number,
    positionFilters: Array<PositionFilter>
  ): Promise<Array<string>> {
    await this.initialize();
    const cardUuids = Array.from(
      await positionFilters.reduce(async (acc: Set<string>, positionFilter) => {
        const res = await this.db.find({
          selector: {
            $and: [
              {
                lastAnsweredPos: { $lt: pos - positionFilter.posOffset },
                correctStrike: { $eq: positionFilter.correctStrike }
              }
            ]
          },
          fields: ['_id']
        });
        res.docs.map(item => item._id).forEach(cardUuid => acc.add(cardUuid));
        return acc;
      }, new Set())
    );
    return cardUuids;
  }
  async getLearnedCards(): Promise<Array<string>> {
    await this.initialize();
    // Alldocs we can't use, because it also returns indexes
    const res = (await this.db.find({ selector: {}, fields: ['_id'] })).docs.map(item => item._id);
    return res;
  }
  async getCurrentPos(): Promise<number> {
    await this.initialize();
    return Promise.resolve(this.currentPos);
  }

  async increaseCurrentPos(): Promise<void> {
    await this.initialize();
    this.currentPos += 1;
    const res = await this.db.put({
      _id: 'currentPos',
      _rev: this.currentPosRev,
      value: this.currentPos
    });
    this.currentPosRev = res.rev;
    return Promise.resolve();
  }
}
