// TODO: Finish this?

const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")

let width = canvas.width;
let height = canvas.height;
let stars = [...Array(300)];
let moveCooldown = 0;
let shootCooldown = 0;

stars = stars.map(() => [rand(0, width), rand(0, height)]);

function intersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    return (
        ((x2 < x1 && x2 + w2 > x1) || (x2 > x1 && x2 < x1 + w1))
        &&
        ((y2 < y1 && y2 + h2 > y1) || (y2 > y1 && y2 < y1 + h1))
    );
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min
}

let keyMap = {};

function handleKey(evt) {
    keyMap[evt.key] = evt.type === 'keydown';
}

window.addEventListener("keydown", handleKey);
window.addEventListener("keyup", handleKey);

let x, y;
x = 50;
y = 120;
const gun = new Image;
gun.src = "/img/bnp.png";

let bullets = [];
const bullet = new Image;
bullet.src = "/img/coin.png";

let enemies = [[0, 0]]
const enemy = new Image;
enemy.src = "/img/stonks.jpg"

function update() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "white";
    stars.forEach(starPos => ctx.fillRect(starPos[0], starPos[1], 1, 1));

    bullets.forEach(bulletPos => ctx.drawImage(bullet, bulletPos[0], bulletPos[1], 8, 8))
    enemies.forEach(enemyPos => ctx.drawImage(enemy, enemyPos[0], enemyPos[1], 16, 16))
    ctx.drawImage(gun, x, y, 16, 16);

    if (moveCooldown <= 0) {
        if (keyMap["ArrowRight"]) {
            if (x + 10 < width) x += 10;
            moveCooldown = 2;
        } else if (keyMap["ArrowLeft"]) {
            if (x - 10 > 0) x -= 10;
            moveCooldown = 2;
        }
    }

    if (shootCooldown <= 0) {
        if (keyMap[" "]) {
            bullets.push([x, y])
            shootCooldown = 3;
        }
    }

    bullets = bullets.map(bulletPos => [bulletPos[0], bulletPos[1] - 5])

    bullets.forEach(bulletPos => {
        enemies = enemies.filter(enemyPos => {
            return !intersect(...bulletPos, 8, 8, ...enemyPos, 16, 16);
        })
    })

    moveCooldown -= 1;
    shootCooldown -= 1;
}

setInterval(update, 40);
