document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for header links
    const headerLinks = document.querySelectorAll('#header a');
    
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Alarm functionality
    const modal = document.getElementById("popupModal");
    const btn = document.getElementById("addAlarmButton");
    const span = document.getElementsByClassName("close")[0];
    const currentTime = document.querySelector(".wrapper h1");
    const content = document.querySelector(".clock-content");
    const selectMenu = document.querySelectorAll("select");
    const setAlarmBtn = document.querySelector(".wrapper button");

    let alarmTime, isAlarmSet = false;
    const ringtone = new Audio("./files/ringtone.mp3");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    for (let i = 12; i > 0; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    }

    for (let i = 59; i >= 0; i--) {
        i = i < 10 ? "0" + i : i;
        let option = `<option value="${i}">${i}</option>`;
        selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    }

    for (let i = 2; i > 0; i--) {
        let ampm = i == 1 ? "AM" : "PM";
        let option = `<option value="${ampm}">${ampm}</option>`;
        selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
    }

    setInterval(() => {
        let date = new Date(),
        h = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds(),
        ampm = "AM";
    
        if (h >= 12) {
            h = h - 12;
            ampm = "PM";
        }
    
        h = h == 0 ? h = 12 : h;
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;
    
        currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    
        if (alarmTime == `${h}:${m} ${ampm}`) {
            ringtone.play();
            ringtone.loop = true;
        }
    }, 1000);
    


    function setAlarm() {
        if (isAlarmSet) {
            alarmTime = "";
            ringtone.pause();
            content.classList.remove("disable");
            setAlarmBtn.innerText = "Set Alarm";
            return isAlarmSet = false;
        }

        let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            return alert("Please, select a valid time to set Alarm!");
        }

        alarmTime = time;
        isAlarmSet = true;
        content.classList.add("disable");
        setAlarmBtn.innerText = "Clear Alarm";
    }

    setAlarmBtn.addEventListener("click", setAlarm);

    // Stopwatch functionality
    let stopwatchSeconds = 00;
    let stopwatchTens = 00;
    let stopwatchMins = 00;
    let getStopwatchSeconds = document.querySelector('.stopwatch-seconds');
    let getStopwatchTens = document.querySelector('.stopwatch-tens');
    let getStopwatchMins = document.querySelector('.stopwatch-mins');
    let btnStopwatchStart = document.querySelector('.stopwatch-btn-start');
    let btnStopwatchStop = document.querySelector('.stopwatch-btn-stop');
    let btnStopwatchReset = document.querySelector('.stopwatch-btn-reset');
    let stopwatchInterval;

    btnStopwatchStart.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = setInterval(startStopwatch, 10);
    })

    btnStopwatchStop.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
    })

    btnStopwatchReset.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchTens = '00';
        stopwatchSeconds = '00';
        stopwatchMins = '00';
        getStopwatchSeconds.innerHTML = stopwatchSeconds;
        getStopwatchTens.innerHTML = stopwatchTens;
        getStopwatchMins.innerHTML = stopwatchMins;
    })

    function startStopwatch() {
        stopwatchTens++;
        if (stopwatchTens <= 9) {
            getStopwatchTens.innerHTML = '0' + stopwatchTens;
        }
        if (stopwatchTens > 9) {
            getStopwatchTens.innerHTML = stopwatchTens;
        }
        if (stopwatchTens > 99) {
            stopwatchSeconds++;
            getStopwatchSeconds.innerHTML = '0' + stopwatchSeconds;
            stopwatchTens = 0;
            getStopwatchTens.innerHTML = '0' + 0;
        }
        if (stopwatchSeconds > 9) {
            getStopwatchSeconds.innerHTML = stopwatchSeconds;
        }
        if (stopwatchSeconds > 59) {
            stopwatchMins++;
            getStopwatchMins.innerHTML = '0' + stopwatchMins;
            stopwatchSeconds = 0;
            getStopwatchSeconds.innerHTML = '0' + 0;
        }
        if (stopwatchMins > 9) {
            getStopwatchMins.innerHTML = stopwatchMins;
        }
    }

    // Timer functionality
    const hoursSelect = document.getElementById('hours');
    const minutesSelect = document.getElementById('minutes');
    const secondsSelect = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer-display');
    const startButton = document.getElementById('start-timer');
    const resetButton = document.getElementById('reset-timer');
    let timerInterval;
    let totalSeconds = 0;

    // Populate select options
    for (let i = 0; i <= 24; i++) {
        hoursSelect.options.add(new Option(i.toString().padStart(2, '0'), i));
    }
    for (let i = 0; i <= 59; i++) {
        minutesSelect.options.add(new Option(i.toString().padStart(2, '0'), i));
        secondsSelect.options.add(new Option(i.toString().padStart(2, '0'), i));
    }

    function updateDisplay() {
        const hours = parseInt(hoursSelect.value) || 0;
        const minutes = parseInt(minutesSelect.value) || 0;
        const seconds = parseInt(secondsSelect.value) || 0;
        timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        totalSeconds = (parseInt(hoursSelect.value) || 0) * 3600 +
                       (parseInt(minutesSelect.value) || 0) * 60 +
                       (parseInt(secondsSelect.value) || 0);
        updateDisplay();
        
        if (totalSeconds > 0) {
            timerInterval = setInterval(() => {
                if (totalSeconds > 0) {
                    totalSeconds--;
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                } else {
                    clearInterval(timerInterval);
                    ringtone.play();
                    ringtone.loop = true;
                }
            }, 1000);
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        totalSeconds = 0;
        hoursSelect.selectedIndex = 0;
        minutesSelect.selectedIndex = 0;
        secondsSelect.selectedIndex = 0;
        updateDisplay();
        ringtone.pause();
        ringtone.currentTime = 0;
    }

    hoursSelect.addEventListener('change', updateDisplay);
    minutesSelect.addEventListener('change', updateDisplay);
    secondsSelect.addEventListener('change', updateDisplay);

    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initial display update
    updateDisplay();
});
