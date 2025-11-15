const END_TIME = "December 10 2025 23:59:59 GMT-0500"; // Shared end time

class CountdownTimer {
    constructor(container, endtime) {
        this.container = container;
        this.endtime = new Date(endtime).getTime();
        this.update = this.update.bind(this);
        this.start();
    }

    start() {
        this.interval = setInterval(this.update, 1000);
    }

    update() {
        const now = new Date().getTime();
        const gap = this.endtime - now;

        if (gap <= 0) {
            clearInterval(this.interval);
            // Show zeros when countdown ends
            this.container.querySelector(".day").innerText = "00";
            this.container.querySelector(".hour").innerText = "00";
            this.container.querySelector(".minute").innerText = "00";
            this.container.querySelector(".second").innerText = "00";
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const textDay = Math.floor(gap / day);
        const textHour = Math.floor((gap % day) / hour);
        const textMinute = Math.floor((gap % hour) / minute);
        const textSecond = Math.floor((gap % minute) / second);

        const pad = (num, digits = 2) => String(num).padStart(digits, "0");

        this.container.querySelector(".day").innerText = pad(textDay);
        this.container.querySelector(".hour").innerText = pad(textHour);
        this.container.querySelector(".minute").innerText = pad(textMinute);
        this.container.querySelector(".second").innerText = pad(textSecond);
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // List of different countdown container classes
    const timerClasses = ["timer1", "timer2", "timer3"];

    // Initialize countdowns for each container
    timerClasses.forEach((cls) => {
        const container = document.querySelector(`.countdown.${cls}`);
        if (container) {
            new CountdownTimer(container, END_TIME);
        }
    });
});
