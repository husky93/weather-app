import spinner from '../assets/spinner.gif';

const ui = (() => {
  const loadIcon = (name) => {
    return import(/* webpackChunkName: "icon" */ `../assets/icons/${name}.png`);
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
    console.log(icon);
    main.appendChild(icon);
  };

  return { renderContent, renderLoading };
})();

export default ui;
