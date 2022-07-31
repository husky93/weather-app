import spinner from '../assets/spinner.gif';
import PubSub from 'pubsub-js';
import { format } from 'date-fns';

const ui = (() => {
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
    const main = document.querySelector('.main');
    const rowOne = createWrapper(['row', 'search__wrapper'], 'div');
    const rowTwo = createWrapper(['row', 'top__wrapper'], 'div');
    const rowThree = createWrapper(['row'], 'div');
    main.append(rowOne, rowTwo, rowThree);
    return [rowOne, rowTwo, rowThree];
  };

  const clearMain = () => {
    const main = document.querySelector('.main');

    while (main.lastElementChild) {
      main.removeChild(main.lastElementChild);
    }
  };

  const renderLoading = () => {
    clearMain();
    const main = document.querySelector('.main');
    const loadingIcon = new Image();
    loadingIcon.src = spinner;
    main.appendChild(loadingIcon);
  };

  const renderContent = (msg, data) => {
    clearMain();
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
