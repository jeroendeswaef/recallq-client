// @flow
import uuid from 'uuid/v4';

const specialCharactersRegExp = new RegExp(/[^\x00-\x7F]/g);
export default class Word {
  uuid: string;
  content: string;
  language: string;
  gender: ?string;

  constructor(content: string, language: string, gender: ?string) {
    this.content = content;
    this.language = language;
    this.gender = gender;
    this.uuid = uuid();
  }

  get contentWithArticle(): string {
    if (!this.content) return this.content;
    const isStartingWithVowel = /[aeiou]/.test(this.content[0]);
    if (this.language === 'en') {
      return `${isStartingWithVowel ? 'an' : 'a'} ${this.content}`;
    } else if (this.language === 'fr') {
      let article: string = '';
      let isSpaceBetween: boolean = true;
      if (this.gender === 'm') {
        article = 'un';
      } else if (this.gender === 'f') {
        article = isStartingWithVowel ? "un'" : 'une';
        isSpaceBetween = !isStartingWithVowel;
      } else {
        throw new Error(`Unknown gender ${this.gender || '<empty>'} for French word`);
      }
      return `${article}${isSpaceBetween ? ' ' : ''}${this.content}`;
    }
    throw new Error('Language not supported');
  }

  get specialCharacters(): Set<string> {
    const result: Set<string> = new Set();
    // eslint-disable-next-line no-unused-vars
    let regExpResult;
    // eslint-disable-next-line no-cond-assign
    while ((regExpResult = specialCharactersRegExp.exec(this.content)) !== null) {
      const specialCharacter: string = regExpResult[0];
      result.add(specialCharacter);
    }
    return result;
  }
}
