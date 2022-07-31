import PubSub from 'pubsub-js';

const controller = (() => {
  const addSearchbarEventListener = (input) => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.querySelector('.search__btn').click();
      }
    });
  };

  const addSearchBtnEventListener = (btn, input) => {
    btn.addEventListener('click', () => {
      PubSub.publish('SEARCH TRIGGERED', input.value);
    });
  };

  const addSearchListeners = (msg, object) => {
    const { input } = object;
    const { btn } = object;
    addSearchbarEventListener(input);
    addSearchBtnEventListener(btn, input);
  };

  return { addSearchListeners };
})();

export default controller;
