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
      .catch((error) => {
        console.log(error);
      });
    return icon;
  };

  const renderLoading = () => {};

  const renderContent = (msg, data) => {
    const body = document.querySelector('body');
    const icon = createIcon(data.weather[0].icon);

    body.appendChild(icon);
  };

  return { renderContent, renderLoading };
})();

export default ui;
