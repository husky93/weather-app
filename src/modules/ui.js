import spinner from '../assets/spinner.gif';
import PubSub from 'pubsub-js';
import { format } from 'date-fns';

const ui = (() => {
  const main = document.querySelector('.main');

  const loadIcon = (name) => {
    return import(/* webpackChunkName: "icon" */ `../assets/icons/${name}.png`);
  };

  const createWrapper = ([...classList], wrapperTag, parent) => {
    const wrapper = document.createElement(`${wrapperTag}`);
    classList.forEach((item) => wrapper.classList.add(item));
    if (parent) parent.appendChild(wrapper);
    return wrapper;
  };

  const createParagraph = ([...classList], text, parent) => {
    const para = document.createElement('p');
    classList.forEach((item) => para.classList.add(item));
    para.textContent = text;
    parent.appendChild(para);
  };

  const createSpan = ([...classList], text, parent) => {
    const span = document.createElement('span');
    classList.forEach((item) => span.classList.add(item));
    span.textContent = text;
    parent.appendChild(span);
  };

  const createButton = ([...classList], text, parent) => {
    const button = document.createElement('button');
    classList.forEach((item) => button.classList.add(item));
    button.textContent = text;
    if (parent) parent.appendChild(button);
    return button;
  };

  const createSearchBar = ([...classList], parent) => {
    const wrapper = createWrapper(['search'], 'div', parent);
    const input = document.createElement('input');
    const btn = createButton(['btn', 'btn--primary', 'search__btn'], 'Search');

    classList.forEach((item) => input.classList.add(item));
    input.type = 'text';
    input.name = 'search';
    input.id = 'searchbar';
    input.placeholder = 'City name...';
    wrapper.append(input, btn);

    PubSub.publish('SEARCHBAR CREATED', { input, btn });
  };

  const createIcon = (name) => {
    const icon = new Image();
    icon.classList.add('icon--weather');
    icon.src = spinner;

    loadIcon(name)
      .then((module) => {
        const src = module.default;
        icon.src = src;
      })
      .catch(() => {
        return new Error('Icon load error:');
      });
    return icon;
  };

  const createMainRows = () => {
    const rowOne = createWrapper(['row', 'search__wrapper'], 'div');
    const rowTwo = createWrapper(['row', 'top__wrapper'], 'div');
    const rowThree = createWrapper(['row'], 'div');
    main.append(rowOne, rowTwo, rowThree);
    return [rowOne, rowTwo, rowThree];
  };

  const clearMain = () => {
    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }
  };

  const renderLoading = () => {
    clearMain();
    const wrapper = createWrapper(['container', 'loading__wrapper'], 'div');
    const loadingIcon = new Image();
    loadingIcon.src = spinner;
    loadingIcon.classList.add('loading');
    wrapper.appendChild(loadingIcon);
    main.appendChild(wrapper);
  };

  const removePrefixedClasses = (prefix, element) => {
    const classes = element.className
      .split(' ')
      .filter((c) => !c.startsWith(prefix));
    element.className = classes.join(' ').trim();
  };

  const changeMainBg = (id, icon) => {
    const prefix = 'bg';
    removePrefixedClasses(prefix, main);
    if (id >= 200 && id <= 622) {
      main.classList.add('bg--rain');
    }
    if (id >= 701 && id <= 781) {
      main.classList.add('bg--cloudy');
    }
    if (id === 800 || id === 801) {
      if (icon.includes('d')) main.classList.add('bg--sunny');
      else main.classList.add('bg--night');
    }
    if (id === 802 || id === 803 || id === 804) {
      if (icon.includes('d')) main.classList.add('bg--cloudy');
      else main.classList.add('bg--night');
    }
  };

  const renderContent = (msg, data) => {
    clearMain();
    changeMainBg(data.weather[0].id, data.weather[0].icon);
    console.log(data);
    const rows = createMainRows();
    const icon = createIcon(data.weather[0].icon);
    const formattedDate = format(new Date(), 'd MMMM, EEEE');
    const info = createWrapper(['container', 'top__info'], 'div');
    const temp = createWrapper(['container', 'top__temp'], 'div');
    createSpan(['temp--main', 'text--bold'], data.temp, temp);
    const feelsLike = createWrapper(
      ['container', 'temp__feelslike'],
      'div',
      temp
    );
    createSpan(['date', 'text--regular'], formattedDate, info);
    createSpan(['location', 'text--semibold'], data.city, info);
    createSpan(['text', 'text--regular'], 'fells like', feelsLike);
    createSpan(['temp--fl', 'text--semibold'], data.feelslike, feelsLike);
    createSearchBar(['search__bar'], rows[0]);

    rows[1].append(info, icon, temp);
  };

  return { renderContent, renderLoading };
})();

export default ui;
