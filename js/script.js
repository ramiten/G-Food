import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {
  toggleModal
} from './modules/modal';

window.addEventListener("DOMContentLoaded", () => {

  const timerToModal = setTimeout(() => toggleModal('.modal', timerToModal), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', timerToModal);
  timer({
    id: '.timer',
    deadline: new Date(),
    promotionTimer: '.promotion'
  });
  cards();
  calc();
  forms('form', timerToModal, '.modal');
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });

});