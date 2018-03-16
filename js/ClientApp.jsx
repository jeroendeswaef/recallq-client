import React from 'react';
import { render } from 'react-dom';

import '../styles/main.scss';

import SoundManager from './SoundManager';
import TrainingComponent from './components/Training';
import TrainingStore from './TrainingStore';

const initialMessages = ["Let's learn some french! 🇫🇷", 'Try to guess the French word for...'];

const soundManager = new SoundManager();
const trainingStore = new TrainingStore(initialMessages);

trainingStore.bind('answered', (card, isCorrect) => {
  soundManager.onCardAnswered(card, isCorrect);
});

render(<TrainingComponent store={trainingStore} />, document.getElementById('app'));
