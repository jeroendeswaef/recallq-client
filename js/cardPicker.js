import Card from './model/Card';

class CardPicker {
  pickCards() {
    return new Promise((resolve, reject) => {
      import('../cards.json').then(cardData => {
        try {
          console.info('loaded!', cardData);
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
