// @flow

import Card from './model/Card';

class CardPicker {
  cards: Array<Card>;
  specialCharacters: Set<string>;

  getCards(): Promise<void> {
    return new Promise((resolve, reject) => {
      import('../cards.json')
        .then(cardData => {
          try {
            this.cards = cardData.map(cardRaw => new Card(cardRaw)).sort((left: Card, right: Card) => {
              // sorting the cards with the highest frequency scores first
              // the ones that don't appear in the frequency scores list last
              if (!isNaN(left.answer.frequencyScore) && !isNaN(right.answer.frequencyScore)) {
                return left.answer.frequencyScore - right.answer.frequencyScore;
              } else if (!isNaN(left.answer.frequencyScore)) {
                return -1;
              } else if (!isNaN(right.answer.frequencyScore)) {
                return 1;
              }
              return 0;
            });
            this.specialCharacters = this.cards.reduce((acc: Set<string>, card: Card): Set<string> => {
              const specialCharactersForCard = Array.from(card.answer.specialCharacters);
              for (let i = 0; i < specialCharactersForCard.length; i += 1) {
                acc.add(specialCharactersForCard[i]);
              }
              return acc;
            }, new Set());
            resolve();
          } catch (ex) {
            reject(ex);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  pickCards(): Promise<Array<Card>> {
    if (this.cards) return Promise.resolve(this.cards);
    return this.getCards().then(() => this.cards);
  }

  getSpecialCharactersForAllCards(): Promise<Set<string>> {
    if (this.specialCharacters) return Promise.resolve(this.specialCharacters);
    return this.getCards().then(() => this.specialCharacters);
  }
}

export default new CardPicker();
