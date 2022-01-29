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

export default timer;