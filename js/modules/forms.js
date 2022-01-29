import {
    postData
} from '../services/services';

import {
    toggleModal
} from './modal';

function forms(formSelector, timerToModal, modalSelector) {
    // Forms

    const forms = document.querySelectorAll(formSelector); // получаем наши формы со страницы

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
    }; //предусматриваем все сценарии

    forms.forEach((item) => {
        bindPostData(item);
    });



    function bindPostData(form) {
        // создаем функцию по отправке данных
        // параметр - форма, событие сабмит
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // отменяем дефолтное поведение
            // мы хотим реализовать сабмит без перезагрузки страницы
            // clearTimeout(timerToModal);
            // window.removeEventListener("scroll", showModalByScroll);

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
                    // console.log(data, "Это промис который уже мы обрабатываем");
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
            toggleModal(modalSelector, timerToModal);
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
                toggleModal(modalSelector);
            }
        }, 3000);
    }

}

export default forms;