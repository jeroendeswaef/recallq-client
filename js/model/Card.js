// @flow

type Answer = {
  contentType: string,
  grammarType: string,
  language: string,
  gender: string,
  content: string
};

type Question = {
  language: string,
  content: string
};

type CardData = {
  uuid: string,
  question: Question,
  answer: Answer
};

export default (function cardSetup() {
  const privateProps = new WeakMap();

  class Card {
    constructor(data: CardData) {
      privateProps.set(this, { data });
    }

    get questionText(): string {
      const privateData = privateProps.get(this);
      return privateData ? privateData.data.question.content : '';
    }
  }
  return Card;
})();
