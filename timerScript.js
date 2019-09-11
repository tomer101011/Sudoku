//time to be used with timeout
let time;

//change time by one
function timer() {
    let hours = Number(document.getElementById('h').innerHTML);
    let minutes = Number(document.getElementById('m').innerHTML);
    let seconds = Number(document.getElementById('s').innerHTML);

    seconds++;
    //if seconds is equal or higher than 60, then 1 min will be added to 'm'
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        //if minutes is equal or higher than 60, then 1 hour will be added to 'h'
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    //preserve time format if seconds or minutes or hours are below 10
    if (seconds <= 9)
        seconds = '0' + seconds;

    if (minutes <= 9)
        minutes = '0' + minutes;

    if (hours <= 9)
        hours = '0' + hours;

    //update html time
    document.getElementById('h').innerHTML = hours;
    document.getElementById('m').innerHTML = minutes;
    document.getElementById('s').innerHTML = seconds;

    //call timer function again after 1s
    time = setTimeout(timer, 1000);
}

//stop timer
function stopTimer() {
    clearTimeout(time);
}

//reset timer
function resetTimer() {
    document.getElementById('h').innerHTML = '00';
    document.getElementById('m').innerHTML = '00';
    document.getElementById('s').innerHTML = '00';
}