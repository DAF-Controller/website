let gauge = document.getElementById('gauge');
let gaugeContainer = document.getElementById('gaugeContainer');
let target = document.getElementById('target');
let message = document.getElementById('message');
let flower = document.getElementById('flower');
let controlButton = document.getElementById('controlButton');
let gaugeWidth = 0;
let speed = Math.random() * 2 + 2;
let direction = 1;
let gaugeInterval;

function randomTargetPosition() {
    let targetWidth = Math.random() * 50 + 25;
    let maxPosition = gaugeContainer.offsetWidth - targetWidth;
    let targetPosition = Math.random() * maxPosition;
    target.style.width = targetWidth + 'px';
    target.style.left = targetPosition + 'px';
}

function moveGauge() {
    gaugeWidth += direction * speed;
    if (gaugeWidth >= gaugeContainer.offsetWidth) {
        gaugeWidth = gaugeContainer.offsetWidth;
        direction = -1;
        speed = Math.random() * 2 + 2;
        randomTargetPosition();
    } else if (gaugeWidth <= 0) {
        gaugeWidth = 0;
        direction = 1;
        speed = Math.random() * 2 + 2;
        randomTargetPosition();
    }
    gauge.style.width = gaugeWidth + 'px';
}

function stopGauge() {
    clearInterval(gaugeInterval);
    let targetLeft = target.offsetLeft;
    let targetRight = targetLeft + target.offsetWidth;
    if (gaugeWidth > targetLeft && gaugeWidth < targetRight) {
        message.innerText = "꽃이 살았습니다!";
        flower.style.backgroundImage = "url('/images/flower_survive.png')";
    } else if (gaugeWidth < targetLeft) {
        message.innerText = "물을 좀 더 주지...";
        flower.style.backgroundImage = "url('/images/flower_dead1.png')";
    } else {
        message.innerText = "물을 너무 많이 줘서...";
        flower.style.backgroundImage = "url('/images/flower_dead2.png')";
    }
    controlButton.innerText = "다시하기";
    controlButton.onclick = resetGame;
}

function resetGame() {
    gaugeWidth = 0;
    gauge.style.width = gaugeWidth + 'px';
    message.innerText = "";
    flower.style.backgroundImage = "url('/images/flower.png')";
    controlButton.innerText = "멈추기";
    controlButton.onclick = stopGauge;
    startGame();
}

function startGame() {
    randomTargetPosition();
    gaugeInterval = setInterval(moveGauge, 20);
}

startGame();
