import Word from './Word';

// @flow

export default class Card {
  questionItems: Array<Word>;
  answer: Word;
  uuid: string;

  constructor(data: CardData) {
    this.questionItems = data.question.map(
      questionData => new Word(questionData.content, questionData.language, questionData.gender)
    );
    this.answer = new Word(data.answer.content, data.answer.language, data.answer.gender, data.answer.freq);
    this.uuid = data.uuid;
  }

  get questionItemsWithArticle(): Array<string> {
    return this.questionItems.map(word => word.contentWithArticle);
  }

  get answerText(): string {
    return this.answer.contentWithArticle;
  }

  validateAnswer(answer: string): { isValid: boolean } {
    const validAnswer = this.answerText;
    const isValid = validAnswer.toLocaleUpperCase() === answer.toUpperCase();
    return { isValid };
  }
}
