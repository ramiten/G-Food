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

export default calc;