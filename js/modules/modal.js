let isModalOpened = true;

function toggleModal(modalSelector, timerToModal) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle("hide");
    document.body.classList.toggle("scrollbar");
    //не даёт скролить страницу когда окно МО

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
            // над этим надо подумать,
            // тк событие не происходит только если мы на кнопку модалку вызовем а это не хорошо
            //надо удаления этого события засунуть в тоггл
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

export default modal;
export {
    toggleModal
};