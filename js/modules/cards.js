import {
    getResourse
} from '../services/services';

function cards() {
    // Используем классы для карточек teacher

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
            //мы описали классы rest оператором, проходимся по массиву и добавляем классы
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



    getResourse("http://localhost:3000/menu").then((data) => {
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

export default cards;