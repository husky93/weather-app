import PubSub from 'pubsub-js';

const API_KEY = '044a0966b2f2703c494f92b31d159d15';

const data = (() => {
  async function fetchCurrentData(msg, city = 'Kraków') {
    if (city.length >= 3) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=1&units=metric&appid=${API_KEY}`,
          { mode: 'cors' }
        );
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        const currentData = await response.json();
        PubSub.publish('GET CURRENT WEATHER', currentData);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const processCurrentData = (msg, object) => {
    const processedData = {
      city: object.name,
      country: object.sys.country,
      clouds: object.clouds.all,
      temp: `${Math.round(object.main.temp)}ºC`,
      feelslike: `${Math.round(object.main.feels_like)}ºC`,
      pressure: object.main.pressure,
      humidity: object.main.humidity,
      dt: object.dt,
      wind: { speed: object.wind.speed, direction: object.wind.deg },
      weather: object.weather,
    };

    if (object.rain) {
      processedData.rain = object.rain['1h'];
    }
    if (object.snow) {
      processedData.snow = object.snow['1h'];
    }
    PubSub.publish('DATA PROCESSED', processedData);

    return processedData;
  };

  return { fetchCurrentData, processCurrentData };
})();

export default data;
