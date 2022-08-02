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
      if (input.value.length >= 3)
        PubSub.publish('SEARCH TRIGGERED', input.value);
    });
  };

  const addSearchListeners = (msg, object) => {
    const { input } = object;
    const { btn } = object;
    addSearchbarEventListener(input);
    addSearchBtnEventListener(btn, input);
  };

  const switchToNextSlide = () => {
    const currentSlide = document.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    const slides = [currentSlide, nextSlide];
    if (nextSlide && nextSlide.classList.contains('slide'))
      slides.forEach((slide) => {
        slide.classList.toggle('active');
        slide.classList.toggle('hidden');
      });
  };

  const switchToPrevSlide = () => {
    const currentSlide = document.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    const slides = [currentSlide, prevSlide];
    if (prevSlide && prevSlide.classList.contains('slide'))
      slides.forEach((slide) => {
        slide.classList.toggle('active');
        slide.classList.toggle('hidden');
      });
  };

  const addSliderListeners = (msg, object) => {
    const { arrowLeft } = object;
    const { arrowRight } = object;

    arrowLeft.addEventListener('click', switchToPrevSlide);
    arrowRight.addEventListener('click', switchToNextSlide);
  };

  return { addSearchListeners, addSliderListeners };
})();

export default controller;
