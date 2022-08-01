import './assets/style.css';
import PubSub from 'pubsub-js';
import data from './modules/data';
import ui from './modules/ui';
import controller from './modules/controller';

ui.renderLoading();

PubSub.subscribe('ERROR', ui.renderError);
PubSub.subscribe('GET CURRENT WEATHER', data.processCurrentData);
PubSub.subscribe('DATA PROCESSED', ui.renderContent);
PubSub.subscribe('SEARCHBAR CREATED', controller.addSearchListeners);
PubSub.subscribe('SEARCH TRIGGERED', data.fetchCurrentData);
PubSub.subscribe('SEARCH TRIGGERED', ui.renderLoading);
PubSub.subscribe('CONTENT RENDERED', data.fetchFiveDayData);
PubSub.subscribe('GET FIVE DAY WEATHER', ui.renderFiveDayWeather);
PubSub.subscribe('FIVE DAY RENDERED', controller.addSliderListeners);

data.fetchCurrentData();
