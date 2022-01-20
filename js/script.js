window.addEventListener("DOMContentLoaded", () => {
  // табы
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  // tabItem[0].classList.remove('tabheader__item_active');

  function hideTabContent() {
    //убирает табы и выделения
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    //показывает табы
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      // что бы определить индекс таба на который мы нажали
      // элементы массива tabs нужно перебрать, ЛОГИКА ТАКОВА
      // ЕСЛИ ЭЛЕМЕНТ ПСЕВДОМАССИВА == ТОМУ ЭЛЕМЕНТУ В КОТОРЫЙ,
      //  КЛИКНУЛ ПОЛЬЗОВАТЕЛЬ: тогда берем его номер и показывам
      // на странице showTabContent(tabs[tabs.childElementCount]);
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Таймер

  // const deadline = '2021-12-16';

  // //Подставления нуля в верстку перед
  // //часами минутми секундами
  // function getZero(num){
  //     if (num >= 0 && num < 10) {
  //         return `0${num}`;
  //     } else {
  //         return num;
  //     }
  // }

  // function getTimeRemaining(endtime) {
  // // задача ф-ии получить разницу между датами
  // const t = Date.parse(endtime) - Date.parse(new Date()),
  //     days = Math.floor(t / (1000 * 60 * 60 * 24)),
  //     hours = Math.floor((t / (1000 * 60 * 60)) % 24),
  //     minutes = Math.floor((t / (1000 * 60)) % 60),
  //     seconds = Math.floor((t / 1000) % 60 );

  //     return {
  //         'total': t,
  //         'days': days,
  //         'hours': hours,
  //         minutes, //синтаксис у обьектов если
  //         seconds, //св == знач по имени
  //     };
  // // Количество секунд до дедлайна - настоящее время
  // // всё в милллисекундах, Теперь эту разницу нужно
  // // превратить в количество дней, часов, минут, секунд
  // }

  // // фунция устанавливает таймер на страницу
  // function setClock(selector, endtime){
  //     const timer = document.querySelector(selector),
  //           days = timer.querySelector('#days'),
  //           hours = timer.querySelector('#hours'),
  //           minutes = timer.querySelector('#minutes'),
  //           seconds = timer.querySelector('#seconds'),
  //           timeInterval = setInterval(updateClock, 1000);

  //     updateClock(); //Мигания верстки
  //     // функция которая будет обнавлять наш таймер
  //     function updateClock() {
  //         const t = getTimeRemaining(endtime);

  //         days.innerHTML = getZero(t.days);
  //         hours.innerHTML = getZero(t.hours);
  //         minutes.innerHTML = getZero(t.minutes);
  //         seconds.innerHTML = getZero(t.seconds);

  //         if (t.total <= 0) {
  //             clearInterval(timeInterval);
  //         }
  //     }
  // }

  // setClock('.timer', deadline);

  const deadline = "2022-12-16";

  function getZero(num) {
    if (num >= 0 && num <= 9) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeRemaining(timeEnd) {
    const t = Date.parse(deadline) - Date.parse(new Date()),
      days = Math.floor(t / (3600000 * 24)),
      hours = Math.floor((t / 3600000) % 24),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, timeEnd) {
    const promotionTimer = document.querySelector(".promotion__timer");
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds");

    setClockOnPage(timeEnd);
    const clockInterval = setInterval(setClockOnPage, 1000);

    function setClockOnPage(timeEnd) {
      const t = getTimeRemaining(timeEnd);
      let counter = 0;

      if (t.total < 0) {
        if (counter == 0) {
          promotionTimer.style.display = "none";
        } else {
          clearInterval(clockInterval);
          promotionTimer.style.display = "none";
        }
      }
      counter++;

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modal = document.querySelector(".modal"),
    modalTrigger = document.querySelectorAll("[data-modal]"),
    // modalCloseBtn = modal.querySelector("[data-close]"),
    docDocElem = document.documentElement;

  function toggleModal() {
    modal.classList.toggle("hide");
    document.body.classList.toggle("scrollbar");
    //не даёт скролить страницу когда окно МО
    // clearTimeout(intervalModal);
    clearTimeout(timerToModal);
  }

  const timerToModal = setTimeout(() => {
    toggleModal();
    window.removeEventListener("scroll", showModalByScroll);
  }, 1000000);

  // const intervalModal = setInterval(() => {
  //     if (docDocElem.scrollTop == docDocElem.scrollHeight - docDocElem.clientHeight) {
  //         // console.log('sex');
  //         toggleModal();
  //         clearTimeout(intervalModal);
  //         clearTimeout(timerToModal);
  //     }
  // }, 50);
  // Сейчас напишу тоже самое только в "простом варианте" НУ событие хули)

  function showModalByScroll() {
    if (
      docDocElem.scrollTop >=
      docDocElem.scrollHeight - docDocElem.clientHeight - 1
    ) {
      toggleModal();
      // clearTimeout(intervalModal);
      clearTimeout(timerToModal);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  modalTrigger.forEach((item) => {
    item.addEventListener("click", toggleModal);
  });

  // modalCloseBtn.addEventListener("click", toggleModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      toggleModal();
      // console.log(e.target.getAttribute("data-close"));
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && !modal.classList.contains("hide")) {
      toggleModal();
    }
  });

  // шаблонизирую карточки с меню (МОЙ ВАРИАНТ)

  // class MenuItem {
  //     constructor(src, subtitle, text, cost) {
  //         const menu = document.querySelector('[data-item]');
  //         const newMenuItem = document.createElement('div'),
  //             imgMenuItem = document.createElement('img'),
  //             subTitelMenuItem = document.createElement('h3'),
  //             textMenuItem = document.createElement('div'),
  //             deviderMenuItem = document.createElement('div'),
  //             priceMenuItem = document.createElement('div'),
  //             costMenuItem = document.createElement('div'),
  //             totalMenuItem = document.createElement('div'),
  //             span = document.createElement('span');

  //         newMenuItem.classList.add('menu__item');

  //         imgMenuItem.src = src;
  //         newMenuItem.append(imgMenuItem);

  //         subTitelMenuItem.classList.add('menu__item-subtitle');
  //         subTitelMenuItem.textContent = subtitle;
  //         newMenuItem.append(subTitelMenuItem);

  //         textMenuItem.classList.add('menu__item-descr');
  //         textMenuItem.textContent = text;
  //         newMenuItem.append(textMenuItem);

  //         deviderMenuItem.classList.add('menu__item-divider');
  //         newMenuItem.append(deviderMenuItem);

  //         priceMenuItem.classList.add('menu__item-price');

  //         costMenuItem.classList.add('menu__item-cost');
  //         costMenuItem.textContent = 'Цена:';
  //         newMenuItem.append(priceMenuItem);

  //         priceMenuItem.append(costMenuItem);

  //         totalMenuItem.classList.add('menu__item-total');
  //         priceMenuItem.append(totalMenuItem);

  //         span.textContent = cost;
  //         totalMenuItem.textContent = ' грн/день';
  //         totalMenuItem.prepend(span);
  //         menu.append(newMenuItem);
  //     }
  // }
  // const newItem = new MenuItem('img/img-1', 'Krevetki', 'Ochinb', '1000');

  // Используем классы для карточек(вариант чела)

  class MenuCard {
    constructor(src, altImg, titel, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.altImg = altImg;
      this.titel = titel;
      this.descr = descr;
      this.price = +price;
      this.classes = classes;
      //dom element
      this.parent = document.querySelector(parentSelector);
      //передаем селектор - родитель, куда мы поместим новую
      //карточку

      this.transfer = 27; //курс доллара (пока так)

      this.changeToUAH(); //метод сработает и присвоит
      // видоизменные значения price
    }

    //метод конвертации валют

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      //создать элемент - поместить верстку
      // и поместить на страницу
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.classes.push("menu__item");
      } //тут типо если мы не указали, то добавит
      this.classes.forEach((className) => element.classList.add(className));
      //мы описали классес rest оператором, проходимся по массиву и добавляем классы
      element.innerHTML = `
                    <img src=${this.src} alt=${this.altImg}>
                    <h3 class="menu__item-subtitle">${this.titel}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">f
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
      //вызовом этого метода мы создаем структуру которая
      // помещается в определенный div
      this.parent.append(element);
    }
  }

  const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json();
  };

  getResourse("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // getResourse("http://localhost:3000/menu").then((data) => createCard(data));

  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement("div");

  //     element.classList.add("menu__item");

  //     element.innerHTML = `
  //     <img src=${img} alt=${altimg}>
  //                   <h3 class="menu__item-subtitle">${title}</h3>
  //                   <div class="menu__item-descr">${descr}</div>
  //                   <div class="menu__item-divider"></div>
  //                   <div class="menu__item-price">f
  //                       <div class="menu__item-cost">Цена:</div>
  //                       <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //                   </div>
  //     `;

  //     document.querySelector(".menu .container").append(element);
  //   });
  // }

  // const getResourse = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fetch ${url}, status:${res.status}`);
  //     //это те ошибки что попадают к нам в консоль
  //   }

  //   return await res.json();
  // };

  // getResourse("http://localhost:3000/menu").then((data) => {
  //   console.log(data);
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // getResourse("http://localhost:3000/menu").then((data) =>
  //   data.forEach((src, altImg, titel, descr, price, parent) => {
  // new MenuCard(src, altImg, titel, descr, price, parent).render();
  //   })
  // );

  // const log = function (a, b, ...rest) {
  //     console.log(a, b, rest);
  // };

  // log('basic', 'res', 'operator', 'usage');

  // function calc0rDoble(number, basis = 2) {
  //     console.log(number * basis);
  // }
  // calc0rDoble(3);

  // Forms

  const forms = document.querySelectorAll("form"); // получаем наши формы со страницы

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  }; //предусматриваем все сценарии

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status:${res.status}`);
      //это те ошибки что попадают к нам в консоль
    }

    return await res.json();
  };

  function bindPostData(form) {
    // создаем функцию по отправке данных
    // параметр - форма, событие сабмит
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // отменяем дефолтное поведение
      // мы хотим реализовать сабмит без перезагрузки страницы
      clearTimeout(timerToModal);
      window.removeEventListener("scroll", showModalByScroll);

      // создадим блог
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      // statusMessage.textContent = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage);

      //настраиваем заголовки
      // request.setRequestHeader("Content-type", "application/json");
      // если смотреть на документацию FormData то надо прописывать
      // этот зоголовок "multipart/form-data"
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // Теперь получив обычный обьект, можем
      // его конвертировать в JSON

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data, "Это промис который уже мы обрабатываем");
          showThanksModal(message.success);
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
          statusMessage.remove();
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const modal = document.querySelector(".modal"),
      prevModalDialog = modal.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");

    if (modal.classList.contains("hide")) {
      toggleModal();
    }

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class="modal__content">
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
    </div>
    `;

    modal.append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.toggle("hide");
      if (!modal.classList.contains("hide")) {
        toggleModal();
      }
    }, 3000);
  }

  // fetch("http://localhost:3000/menu").then((data) => data.json());
  // .then((res) => console.log(res));

  // fetch("https://jsonplaceholder.typicode.com/", {
  //   method: "POST", //пост понятно, джсон тк сервер джсон
  //   body: JSON.stringify({ name: "Alex" }),
  //   headers: {
  //     //ну http заголовки
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
});
