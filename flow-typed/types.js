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
  content: string
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
