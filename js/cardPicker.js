import Card from './model/Card';

class CardPicker {
  pickCards() {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: "chunk1" */ '../cards.json').then(cardData => {
        try {
          const cards = cardData.map(cardRaw => new Card(cardRaw));
          resolve(cards);
        } catch (ex) {
          reject(ex);
        }
      });
    });
  }
}

export default new CardPicker();
