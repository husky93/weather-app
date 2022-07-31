import './assets/style.css';
import PubSub from 'pubsub-js';
import data from './modules/data';
import ui from './modules/ui';

PubSub.subscribe('GET CURRENT WEATHER', data.processCurrentData);
PubSub.subscribe('DATA PROCESSED', ui.renderData);

data.fetchCurrentData('Konin');
