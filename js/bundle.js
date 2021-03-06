/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    //calc
    const result = document.querySelector(".calculating__result span");

    const getLocalData = (selector) => {
        if (localStorage.getItem(selector) != 0) {
            document.getElementById(selector).value = localStorage.getItem(selector);
        }
        return localStorage.getItem(selector);
    };

    let sex = localStorage.getItem("sex") ? localStorage.getItem("sex") : localStorage.setItem("sex", 'female'),
        height = +getLocalData("height"),
        weight = +getLocalData("weight"),
        age = +getLocalData("age"),
        ratio = localStorage.getItem("ratio") ? localStorage.getItem("ratio") : localStorage.setItem("ratio", 1.375);

    function initLocalSetting(selector, activeClass) {
        document.querySelectorAll(selector).forEach((elem) => {
            elem.classList.remove(activeClass);
            if (
                elem.getAttribute("id") === localStorage.getItem("sex") ||
                elem.getAttribute("data-ratio") === localStorage.getItem("ratio")
            ) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSetting(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );
    initLocalSetting("#gender div", "calculating__choose-item_active");

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const element = document.querySelectorAll(parentSelector);

        element.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                if (e.target.getAttribute("data-ratio")) {
                    ratio = +e.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", ratio);
                } else {
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", sex);
                }

                element.forEach((elem) => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(
        ".calculating__choose_big div",
        "calculating__choose-item_active"
    );

    function getDinamicInformation(selector) {
        const input = document.getElementById(selector);

        input.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        input.addEventListener("keydown", (e) => {
            if (!e.key.match(/[0-9]/) && e.keyCode !== 8 &&
                e.keyCode !== 46 &&
                e.keyCode !== 37 &&
                e.keyCode !== 39 &&
                e.keyCode !== 9) {
                return e.preventDefault();
            }
        });

        input.addEventListener("input", (e) => {
            switch (selector) {
                case "height":
                    height = +input.value;
                    localStorage.setItem("height", height);
                    break;
                case "weight":
                    weight = +input.value;
                    localStorage.setItem("weight", weight);
                    break;
                case "age":
                    age = +input.value;
                    localStorage.setItem("age", age);
                    break;
            }
            calcTotal();
        });
    }

    getDinamicInformation("height");
    getDinamicInformation("weight");
    getDinamicInformation("age");

    function calcTotal() {
        if (!(height && weight && age)) {
            result.textContent = "____";
            return;
        }

        if (sex === "female") {
            result.textContent = Math.round(
                (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
            );
        } else {
            result.textContent = Math.round(
                (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
            );
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // ???????????????????? ???????????? ?????? ???????????????? teacher

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
            //???????????????? ???????????????? - ????????????????, ???????? ???? ???????????????? ??????????
            //????????????????

            this.transfer = 27; //???????? ?????????????? (???????? ??????)

            this.changeToUAH(); //?????????? ?????????????????? ?? ????????????????
            // ???????????????????????? ???????????????? price
        }

        //?????????? ?????????????????????? ??????????

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            //?????????????? ?????????????? - ?????????????????? ??????????????
            // ?? ?????????????????? ???? ????????????????
            const element = document.createElement("div");
            if (this.classes.length === 0) {
                this.classes.push("menu__item");
            } //?????? ???????? ???????? ???? ???? ??????????????, ???? ??????????????
            this.classes.forEach((className) => element.classList.add(className));
            //???? ?????????????? ???????????? rest ????????????????????, ???????????????????? ???? ?????????????? ?? ?????????????????? ????????????
            element.innerHTML = `
                    <img src=${this.src} alt=${this.altImg}>
                    <h3 class="menu__item-subtitle">${this.titel}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">f
                        <div class="menu__item-cost">????????:</div>
                        <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                    </div>
            `;
            //?????????????? ?????????? ???????????? ???? ?????????????? ?????????????????? ??????????????
            // ???????????????????? ?? ???????????????????????? div
            this.parent.append(element);
        }
    }



    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)("http://localhost:3000/menu").then((data) => {
        data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");




function forms(formSelector, timerToModal, modalSelector) {
    // Forms

    const forms = document.querySelectorAll(formSelector); // ???????????????? ???????? ?????????? ???? ????????????????

    const message = {
        loading: "img/form/spinner.svg",
        success: "??????????????! ?????????? ???? ?? ???????? ????????????????",
        failure: "??????-???? ?????????? ???? ??????...",
    }; //?????????????????????????????? ?????? ????????????????

    forms.forEach((item) => {
        bindPostData(item);
    });



    function bindPostData(form) {
        // ?????????????? ?????????????? ???? ???????????????? ????????????
        // ???????????????? - ??????????, ?????????????? ????????????
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // ???????????????? ?????????????????? ??????????????????
            // ???? ?????????? ?????????????????????? ???????????? ?????? ???????????????????????? ????????????????
            // clearTimeout(timerToModal);
            // window.removeEventListener("scroll", showModalByScroll);

            // ???????????????? ????????
            const statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            // statusMessage.textContent = message.loading;
            statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
            // form.append(statusMessage);
            form.insertAdjacentElement("afterend", statusMessage);

            //?????????????????????? ??????????????????
            // request.setRequestHeader("Content-type", "application/json");
            // ???????? ???????????????? ???? ???????????????????????? FormData ???? ???????? ??????????????????????
            // ???????? ?????????????????? "multipart/form-data"
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // ???????????? ?????????????? ?????????????? ????????????, ??????????
            // ?????? ???????????????????????????? ?? JSON

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)("http://localhost:3000/requests", json)
                .then((data) => {
                    // console.log(data, "?????? ???????????? ?????????????? ?????? ???? ????????????????????????");
                    showThanksModal(message.success);
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();
                });

        });
    }

    function showThanksModal(message) {
        const modal = document.querySelector(modalSelector),
            prevModalDialog = modal.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");

        if (modal.classList.contains("hide")) {
            (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleModal)(modalSelector, timerToModal);
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
                (0,_modal__WEBPACK_IMPORTED_MODULE_1__.toggleModal)(modalSelector);
            }
        }, 3000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "toggleModal": () => (/* binding */ toggleModal)
/* harmony export */ });
let isModalOpened = true;

function toggleModal(modalSelector, timerToModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle("hide");
    document.body.classList.toggle("scrollbar");
    //???? ???????? ???????????????? ???????????????? ?????????? ???????? ????

    // window.removeEventListener("scroll", showModalByScroll);

    if (timerToModal) {
        clearTimeout(timerToModal);
    }

    isModalOpened = false;
}

function modal(triggerSelector, modalSelector, timerToModal) {
    // Modal

    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector);


    modalTrigger.forEach((item) => {
        item.addEventListener("click", () => {
            toggleModal(modalSelector, timerToModal);
            // ?????? ???????? ???????? ????????????????,
            // ???? ?????????????? ???? ???????????????????? ???????????? ???????? ???? ???? ???????????? ?????????????? ?????????????? ?? ?????? ???? ????????????
            //???????? ???????????????? ?????????? ?????????????? ???????????????? ?? ??????????
        });
    });

    function showModalByScroll() {

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            if (isModalOpened) {
                toggleModal(modalSelector, timerToModal);
            }
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);


    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            toggleModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code == "Escape" && !modal.classList.contains("hide")) {
            toggleModal(modalSelector);
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field,
}) {
    // slider ????????????????->

    let offset = 0;
    let slideIndex = 1;

    const slides = document.querySelectorAll(slide),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(field),
        // ?????? ??????????
        theWholeSlider = document.querySelector(container),
        dotesWrapper = document.createElement("div");

    slidesField.style.width = 100 * slides.length + "%";

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = `${slideIndex}`;
    }

    // ?????? ??????
    theWholeSlider.style.position = "relative";
    dotesWrapper.classList.add("carousel-indicators");

    theWholeSlider.insertAdjacentElement("beforeend", dotesWrapper);

    for (let index = 0; index < slides.length; index++) {
        const dot = document.createElement("checkbox");
        dot.setAttribute("type", "radio");
        dot.setAttribute("data-slideIndex", index);

        if (slideIndex === +dot.getAttribute("data-slideIndex", index) + 1) {
            dot.classList.add("actived");
        }

        dot.classList.add("dot");
        dotesWrapper.append(dot);
    }

    function showCorrectDot(n) {
        dotesWrapper.childNodes.forEach((dot) => {
            if (+dot.getAttribute("data-slideIndex") === n - 1) {
                dot.classList.add("actived");
            } else {
                dot.classList.remove("actived");
            }
        });
    }
    //

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, "");
    }

    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        showCurrentSlide(slideIndex);
        showCorrectDot(slideIndex); // ?????? ??????????
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener("click", () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        showCurrentSlide(slideIndex);
        showCorrectDot(slideIndex); // ?????? ??????????
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    function showCurrentSlide(n) {
        if (n < 10) {
            current.textContent = `0${n}`;
        } else {
            current.textContent = n;
        }
    }

    // Dotes for slider ?????? ????????????????????, ?????? ???? ?????? ??????????????????

    dotesWrapper.addEventListener("click", (e) => {
        if (e.target.classList.contains("dot")) {
            const dotIndex = +e.target.getAttribute("data-slideIndex");
            dotesWrapper.childNodes.forEach((item) => {
                item.classList.remove("actived");
            });
            e.target.classList.add("actived");

            offset = deleteNotDigits(width) * dotIndex;

            slidesField.style.transform = `translateX(-${offset}px)`;

            slideIndex = dotIndex + 1;

            showCurrentSlide(dotIndex + 1);
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // ????????
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    // tabItem[0].classList.remove('tabheader__item_active');

    function hideTabContent() {
        //?????????????? ???????? ?? ??????????????????
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        //???????????????????? ????????
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            // ?????? ???? ???????????????????? ???????????? ???????? ???? ?????????????? ???? ????????????
            // ???????????????? ?????????????? tabs ?????????? ??????????????????, ???????????? ????????????
            // ???????? ?????????????? ?????????????????????????? == ???????? ???????????????? ?? ??????????????,
            //  ?????????????? ????????????????????????: ?????????? ?????????? ?????? ?????????? ?? ??????????????????
            // ???? ???????????????? showTabContent(tabs[tabs.childElementCount]);
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer({
    id,
    deadline,
    promotionTimer
}) {
    promotionTimer = document.querySelector(promotionTimer);
    //timer
    function getZero(num) {
        if (num >= 0 && num <= 9) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getTimeRemaining() {
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

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourse": () => (/* binding */ getResourse),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
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
        //?????? ???? ???????????? ?????? ???????????????? ?? ?????? ?? ??????????????
    }

    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status:${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener("DOMContentLoaded", () => {

  const timerToModal = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.toggleModal)('.modal', timerToModal), 50000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', timerToModal);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])({
    id: '.timer',
    deadline: new Date(),
    promotionTimer: '.promotion'
  });
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', timerToModal, '.modal');
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map