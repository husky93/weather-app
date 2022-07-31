import PubSub from 'pubsub-js';

const API_KEY = '044a0966b2f2703c494f92b31d159d15';

const data = (() => {
  async function fetchCurrentData(city = 'Kraków') {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=2&appid=${API_KEY}`
    );
    const currentData = await response.json();

    PubSub.publish('GET CURRENT WEATHER', currentData);
  }

  return { fetchCurrentData };
})();

export default data;
