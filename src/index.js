import './assets/style.css';
import PubSub from 'pubsub-js';
import data from './modules/data';
import ui from './modules/ui';

const token = PubSub.subscribe('GET CURRENT WEATHER', ui.renderData);

data.fetchCurrentData();
console.log(token);
