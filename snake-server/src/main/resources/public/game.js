const mx = 50;
const my = 50;

let canvas;
let ctx;
let timerId;

let fruit = {
    x: 12, y: 11
};
let direction = {
    dx: 1, dy: 0,
};
const tail = [
    {x: 1, y: 1},
    {x: 2, y: 1},
    {x: 3, y: 1}
];
function generateFruit() {
    return {
        x: Math.floor(Math.random() * mx),
        y: Math.floor(Math.random() * my)
    };
}
function isGameOver(head) {
    if (head.x < 0 || head.x >= mx || head.y < 0 || head.y >= my) {
        return true;
    }
    for (let i = 0; i < tail.length - 1; i++) {
        if (tail[i].x === head.x && tail[i].y === head.y) {
            return true;
        }
    }
    return false;
}
function closeWindowWithConfirm() {
    if (confirm("Biztosan be szeretné zárni az oldalt?")) {
        window.close();
    }
}
function refreshPage() {
    location.reload();
}
function updateScoreBoard() {
    const scoreBoard = document.getElementById("score-value");
    let score = tail.length - 3;
    if (score < 0 || isNaN(score)) {
        score = 0;
    }
    scoreBoard.innerHTML = `<span style="color: #ff7b00; font-family: 'Audiowide', cursive;">Pontszám: ${score}</span>`;
}
document.addEventListener('DOMContentLoaded', function() {
    alert("Snake upgrade V2.1 Beta\n" +
        "\\Please notice all the functions are under development." +"\n"
        + "There is a chance some of them may explode." + "\n"
        +"Thank you for playing.\\");
});

const move = () => {
    const oldHead = tail[tail.length - 1];
    const newHead = {
        x: oldHead.x + direction.dx,
        y: oldHead.y + direction.dy
    };
    if (isGameOver(newHead)) {
        clearInterval(timerId);
        alert("Játék vége! Pontszám: " + (tail.length - 3));
        refreshPage();
        return;
    }
    if (newHead.x === fruit.x && newHead.y === fruit.y) {

        fruit = generateFruit();
    } else {
        tail.shift();
    }
    tail.push(newHead);
    draw();
    const scoreValue = document.getElementById("score-value");
    let score = tail.length - 3;
    if (score < 0 || isNaN(score)) {
        score = 0;
    }
    scoreValue.textContent = score;
};
const draw = () => {
    ctx.clearRect(0, 0, mx * 10, my * 10);
    tail.forEach((coord) => {
        ctx.fillStyle = "#ff7b00";
        ctx.fillRect(coord.x * 10, coord.y * 10, 10, 10);
    });
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(fruit.x * 10, fruit.y * 10, 10, 10);
    ctx.strokeStyle = "#cccccc";
    for (let x = 0; x <= mx * 10; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, my * 10);
        ctx.stroke();
    }
    for (let y = 0; y <= my * 10; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(mx * 10, y);
        ctx.stroke();
    }
};
document.getElementById("start").onclick = () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    tail.length = 0;
    tail.push({x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1});
    direction = {dx: 1, dy: 0};
    fruit = generateFruit();
    draw();
    updateScoreBoard();
    timerId = setInterval(move, 200);
};
document.getElementById("stop").onclick = () => {
    let isPaused = false;
    let savedInterval = 200;
    document.getElementById("stop").onclick = () => {
        const stopButton = document.getElementById("stop");

        if (!timerId && !isPaused) {
            return;
        }
        if (!isPaused) {
            clearInterval(timerId);
            timerId = null;
            isPaused = true;
            stopButton.textContent = "⏯";
        } else {
            timerId = setInterval(move, savedInterval);
            isPaused = false;
            stopButton.textContent = "PAUSE";
        }
    }
}
document.getElementById("reset").onclick = () => {
    refreshPage();
}
document.getElementById("leave").onclick = () => {
    closeWindowWithConfirm();
}
document.getElementById("help").onclick = () => {
    alert("A nyilak segitségével tudod irányítani." + "\n"
        + "leave-el kilépsz a játékból." + "\n"
        + "Start,Stop nem magyarázom." + "\n"
        + "A Reset gombot se szeretném." + "\n"
        + "Minnél több pontod van anál jobb vagy");
}
document.getElementById("score").onclick = () => {
    const scoreButton = document.getElementById("score");
    const scoreValue = document.getElementById("score-value");
    let score = tail.length - 3;
    if (score < 0 || isNaN(score)) {
        score = 0;
    }
    scoreValue.textContent = score;
    scoreButton.classList.toggle('flip');
    if (scoreButton.classList.contains('flipped')) {
        scoreButton.classList.remove('flipped');
    } else {
        scoreButton.classList.add('flipped');
    }
};
document.addEventListener("keydown", (event) => {
    console.log("Key pressed down:", event);
    if (event.code === "ArrowUp") {
        event.preventDefault();
        direction.dx = 0;
        direction.dy = -1;
    }
    if (event.code === "ArrowDown") {
        event.preventDefault();
        direction.dx = 0;
        direction.dy = 1;
    }
    if (event.code === "ArrowRight") {
        event.preventDefault();
        direction.dx = 1;
        direction.dy = 0;
    }
    if (event.code === "ArrowLeft") {
        event.preventDefault();
        direction.dx = -1;
        direction.dy = 0;
    }
});
const mainButton = document.getElementById("main-button");
const menuButtons = document.querySelector('.buttons');
mainButton.addEventListener("click", () => {
    menuButtons.classList.toggle('open');
});
const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;
// lebegő baszokat csinál
for (let i = 0; i < particleCount; i++) {
    createParticle();
}
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    // változó méretűek a baszok
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    resetParticle(particle);
    particlesContainer.appendChild(particle);
    // animálj józsiiiii!!!
    animateParticle(particle);
}
function resetParticle(particle) {
    // a lebegő baszok random pozija
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = '0';
    return {
        x: posX,
        y: posY
    };
}
function animateParticle(particle) {
    // induló pozícoó fixálása
    const pos = resetParticle(particle);
    // random animál!!
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    // Animáció időzítő
    setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        //animációt mozgat
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;
        // Resetel az animációk után
        setTimeout(() => {
            animateParticle(particle);
        }, duration * 1000);
    }, delay * 1000);
}
// Egér vezérlés
document.addEventListener('mousemove', (e) => {
    // kis baszokat csinál az egérnél
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    // átmeneti fütyiket csinál
    const particle = document.createElement('div');
    particle.className = 'particle';
    // változó méretű lebegő baszok
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // az egér helyzetét het.meg
    particle.style.left = `${mouseX}%`;
    particle.style.top = `${mouseY}%`;
    particle.style.opacity = '0.6';
    particlesContainer.appendChild(particle);
    // végleges animálás
    setTimeout(() => {
        particle.style.transition = 'all 2s ease-out';
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = '0';
        // eltávolit az animáció után
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }, 10);
});
