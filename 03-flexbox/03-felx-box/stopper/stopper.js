// Implementáljuk egy stopperóra működését felhasználva a mellékelt html sablon elemeit.

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timerDisplay");
let int = null;
let part;

function refreshPage() {
    location.reload();
}


document.getElementById("startTimer").addEventListener("click", () => {
    if(int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});


document.getElementById("pauseTimer").addEventListener("click", () => {
    clearInterval(int);
});


document.getElementById("resetTimer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000";
    refreshPage();


});
document.getElementById("partTimer").addEventListener("click", () => {
    const paragraph = document.createElement("p");

    paragraph.innerHTML = 'Part Time: ' + timeRef.innerHTML;
    document.getElementById("partTimerDiv").appendChild(paragraph);

});
// on load event part time beszűrása
// nullánál hozzá ad.



function displayTimer() {
    milliseconds += 10;

    if(milliseconds == 1000) {
        milliseconds = 0;
        seconds++;

        if(seconds == 60) {
            seconds = 0;
            minutes++;

            if(minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }


    let h = hours < 10 ? "0" + hours : hours;
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;


    timeRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}