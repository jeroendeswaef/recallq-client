import React from 'react';
import { render } from 'react-dom';

import '../styles/main.scss';

import preload from '../cards.json';
import TrainingComponent from './components/Training';
import TrainingStore from './TrainingStore';
import Card from './model/Card';

const initialMessages = ["Let's learn some french! 🇫🇷", 'Try to guess the French word for...'];
const cards = preload.map(cardData => new Card(cardData));

const trainingStore = new TrainingStore(initialMessages, cards);

render(<TrainingComponent store={trainingStore} />, document.getElementById('app'));
