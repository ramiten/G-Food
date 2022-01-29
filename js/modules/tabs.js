function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // табы
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    // tabItem[0].classList.remove('tabheader__item_active');

    function hideTabContent() {
        //убирает табы и выделения
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        //показывает табы
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
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
}

export default tabs;