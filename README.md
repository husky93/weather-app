# weather-app

Weather web application that displays data fetched from [OpenWeatherMap API](https://openweathermap.org/). Made with vanilla JavaScript with use of Publisher/Subscriber pattern to control application events, and with use of Module pattern to encapsulate exported modules.

**Live [click here](https://husky93.github.io/weather-app/)**

## Features
- Dynamically generated
- Display Current Weather
- Display 5 Day Forecast
- Display weather by city name
- Display spinner while loading
- Change background color according to weather / time of the day
- Responsive UI
 
![Sunny](https://github.com/husky93/weather-app/blob/main/sunny.jpg?raw=true)
![Night](https://github.com/husky93/weather-app/blob/main/night.jpg?raw=true)
![Cloudy](https://github.com/husky93/weather-app/blob/main/cloudy.jpg?raw=true)
![Thunder](https://github.com/husky93/weather-app/blob/main/thunder.jpg?raw=true)

### Dependencies Used:
- [PubSubJS](https://github.com/mroderick/PubSubJS)
- [date-fns](https://github.com/date-fns/date-fns)

#### Dev dependencies:
- [webpack](https://github.com/webpack/webpack)
- [babel](https://github.com/babel/babel)
- [file-loader](https://github.com/webpack-contrib/file-loader)
- [style-loader](https://github.com/webpack-contrib/style-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)

### APIs used:
- [Current Weather](https://openweathermap.org/current)
- [Five Day Forecast](https://openweathermap.org/forecast5)

### To add:
- Geolocation

### Assets used:
- <a target="_blank" href="https://icons8.com/icon/RmKPpQoqIwH5/back">Back</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
- <a target="_blank" href="https://icons8.com/icon/PgkW7OrWEEv4/forward">Forward</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
