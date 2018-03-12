import React from 'react';
import { render } from 'react-dom';

import '../styles/main.scss';

// import cards from '../cards.json';
import TrainingComponent from './components/Training';
import TrainingStore from './trainingStore';

const initialMessages = ["Let's learn some french! 🇫🇷"];
const trainingStore = new TrainingStore(initialMessages);

render(<TrainingComponent store={trainingStore} />, document.getElementById('app'));
