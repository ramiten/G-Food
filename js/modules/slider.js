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
    // slider карусель->

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
        // для дотов
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

    // для дот
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
        showCorrectDot(slideIndex); // для дотов
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
        showCorrectDot(slideIndex); // для дотов
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    function showCurrentSlide(n) {
        if (n < 10) {
            current.textContent = `0${n}`;
        } else {
            current.textContent = n;
        }
    }

    // Dotes for slider моя реализация, иду по его алгоритму

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

export default slider;