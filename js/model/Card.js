import Word from './Word';

// @flow

export default class Card {
  questionItems: Array<Word>;
  uuid: string;
  cardData: CardData;

  constructor(data: CardData) {
    this.cardData = data;
    this.questionItems = this.cardData.question.map(
      questionData => new Word(questionData.content, questionData.language, questionData.gender)
    );
    this.uuid = data.uuid;
  }

  get questionItemsWithArticle(): Array<string> {
    return this.questionItems.map(word => word.contentWithArticle);
  }

  get questionText(): string {
    return this.cardData.question[0].content;
  }

  get answerText(): string {
    return this.cardData.answer.content;
  }

  validateAnswer(answer: string): { isValid: boolean } {
    const validAnswer = this.cardData.answer.content;
    const isValid = validAnswer.toLocaleUpperCase() === answer.toUpperCase();
    return { isValid };
  }
}
