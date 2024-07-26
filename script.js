// Get the modal
var modal = document.getElementById("popupModal");

// Get the button that opens the modal
var btn = document.getElementById("addAlarmButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Populate the select elements
const currentTime = document.querySelectorAll("h1");
const content = document.querySelector(".clock-content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".wrapper button");

let alarmTime, isAlarmSet = false; 
const ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectMenu[0].appendChild(option);
}

for (let i = 59; i > 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectMenu[1].appendChild(option);
}

const ampmOptions = ["AM", "PM"];
ampmOptions.forEach((ampm) => {
    let option = document.createElement("option");
    option.value = ampm;
    option.textContent = ampm;
    selectMenu[2].appendChild(option);
});

setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h == 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime[0].innerText = `${h}:${m}:${s} ${ampm}`;  

    if(alarmTime === `${h}:${m}:${s} ${ampm}`){
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
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minutes") || time.includes("AM|PM")) {
        return alert("Please, select a valid time to set.");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
    console.log(time);
}

setAlarmBtn.addEventListener("click", setAlarm);

// ... (keep your existing JavaScript code) ...

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