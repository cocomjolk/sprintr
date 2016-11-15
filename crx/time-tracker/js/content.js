var timeoutID;

console.log("injected");

function setup() {
    this.addEventListener('mousemove', resetTimer, false);
    this.addEventListener('mousedown', resetTimer, false);
    this.addEventListener('keypress', resetTimer, false);
    this.addEventListener('scroll', resetTimer, false);
    this.addEventListener('wheel', resetTimer, false);
    this.addEventListener('touchmove', resetTimer, false);
    this.addEventListener('pointermove', resetTimer, false);

    startTimer();
}

setup();

function startTimer() {
    timeoutID = window.setTimeout(goInactive, 5000);
}

function resetTimer(e) {
    window.clearTimeout(timeoutID);
    goActive();
}

function goInactive() {
    chrome.runtime.sendMessage({ userActive: false });
}

function goActive() {
    chrome.runtime.sendMessage({ userActive: true });
    startTimer();
}
