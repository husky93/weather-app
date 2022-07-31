import spinner from '../assets/spinner.gif';
import PubSub from 'pubsub-js';

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
    const main = document.querySelector('.main');
    const icon = createIcon(data.weather[0].icon);
    createSearchBar(['search__bar'], main);
    main.appendChild(icon);
  };

  return { renderContent, renderLoading };
})();

export default ui;
