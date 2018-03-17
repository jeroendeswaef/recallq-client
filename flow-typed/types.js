/* eslint-disable no-unused-vars */
// @flow
declare class Audio {
  constructor(urlStr: string): void,

  play(): void
}

export type Answer = {
  contentType: string,
  grammarType: string,
  language: string,
  gender: string,
  content: string,
  freq: ?number
};

export type Question = {
  language: string,
  content: string
};

export type CardData = {
  uuid: string,
  question: Question[],
  answer: Answer
};

declare type ProgressForCard = {
  // The position in the virtual queue on which a card was last answered
  lastAnsweredPos: number,
  correctStrike: number
};

declare type PositionFilter = {
  posOffset: number,
  correctStrike: number
};

interface ProgressDAO {
  getCurrentPos(): number,
  increaseCurrentPos(): void,
  setProgress(cardUuid: string, progress: ProgressForCard): void,
  getProgress(cardUuid: string): ?ProgressForCard,
  findCardsWithAnsweredPositionBefore(pos: number, Array<PositionFilter>): Array<string>,
  getLearnedCards(): Array<string>
}
