import React from 'react';
import { render } from 'react-dom';

import '../styles/main.scss';

// import cards from '../cards.json';
import Training from './model/Training';
import TrainingComponent from './components/Training';

const initialMessages = ["Let's learn some french! 🇫🇷"];
const training = new Training(initialMessages);
render(<TrainingComponent messages={training.getMessages()} />, document.getElementById('app'));
