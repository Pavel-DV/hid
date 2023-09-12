const $timer = document.getElementById('timer');

$timer.dataset.timerBegin = new Date().getTime();

animation();

function animation() {
    update($timer, 2);

    requestAnimationFrame(animation);
}

function wait(timeout) {
    const startTime = new Date().getTime()

    return new Promise(resolve => {
        function frame() {
            if (startTime  + timeout < new Date().getTime()) {
                resolve()
            } else {
                requestAnimationFrame(frame)
            }
        }

        frame()
    })
}

function update($node, digits, time = null) {
    if (!$node.dataset.timerBegin) {
        return;
    }

    const endTime = time ?? new Date().getTime();

    const millisecondsPassed = endTime - $node.dataset.timerBegin;
    const prevSecondsValue = $node.firstChild.innerHTML
    const newSecondsValue = toHHMMSS(millisecondsPassed)

    $node.firstChild.innerHTML = newSecondsValue;
    if (digits) {
        const fraction = getFraction(millisecondsPassed, digits)
        $node.children[1].innerHTML = fraction;
        // console.log(fraction)

        if (prevSecondsValue !== newSecondsValue) {
            console.log(fraction)
            doClick()
        }
    }
}

function toHHMMSS(milliseconds) {
    const secondsTotal = Math.floor(milliseconds / 1000);
    const hours = Math.floor(secondsTotal / 3600);
    const minutes = Math.floor((secondsTotal - (hours * 3600)) / 60);
    const seconds = secondsTotal - (hours * 3600) - (minutes * 60);

    const hoursShow = hours || '';
    const hoursSeparator = hours ? ':' : '';
    const minutesShow = (minutes < 10 && hours) ? `0${minutes}` : minutes;
    const secondsShow = (seconds < 10) ? `0${seconds}` : seconds;
    return `${hoursShow}${hoursSeparator}${minutesShow}:${secondsShow}`;
}

function getFraction(milliseconds, digitsCount) {
    return '.' + ('00' + milliseconds).substr(-3, digitsCount);
}