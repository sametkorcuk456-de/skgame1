// =========================
// SKgame1 - game.js
// =========================

let score = 0;
let canShoot = true;

// Ekranlar
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const game = document.getElementById('game');

// Oyun elemanları
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const goal = document.getElementById('goal');
const goalkeeper = document.getElementById('goalkeeper');
const ball = document.getElementById('ball');
const player = document.getElementById('player');

// Bitiş ekranı
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const small = document.getElementById('small');

// -------------------------
// Menü
// -------------------------

function showMenu() {
    menu.classList.add('active');
    controls.classList.remove('active');
    game.classList.remove('active');
}

function showControls() {
    menu.classList.remove('active');
    controls.classList.add('active');
    game.classList.remove('active');
}

function startGame() {
    score = 0;
    canShoot = true;

    updateScore();

    message.textContent = '';
    overlay.style.display = 'none';

    menu.classList.remove('active');
    controls.classList.remove('active');
    game.classList.add('active');
}

// -------------------------
// Puan
// -------------------------

function updateScore() {
    scoreEl.textContent = 'Puan: ' + score;
}

// -------------------------
// Beklemelisin animasyonu
// -------------------------

function waitMessage() {

    player.textContent = 'Beklemelisin!';
    player.classList.add('shake');

    setTimeout(() => {

        player.textContent = '⚽ Futbolcu';
        player.classList.remove('shake');

    }, 500);
}

// -------------------------
// Kazanma / Kaybetme
// -------------------------

function checkGame() {

    if (score >= 10) {

        overlay.style.display = 'flex';

        overlayTitle.textContent = '🎉 İYİ Kİ DOĞDUN EYMEN 🎉';
        overlayText.textContent = 'Bu oyun senin için yapıldı!';
        small.textContent = '';

    }

    if (score <= -3) {

        overlay.style.display = 'flex';

        overlayTitle.textContent = '👔 Teknik Direktör';
        overlayText.textContent = 'Sen bir işe yaramazsın.';

        setTimeout(() => {

            overlayTitle.textContent = '❌ Artık takımdan atıldın';
            overlayText.textContent = '';
            small.textContent = 'F5 ile en baştan başla';

        }, 2000);
    }
}

// -------------------------
// Test Butonları
// -------------------------

function addPoint() {
    score++;
    updateScore();
    checkGame();
}

function removePoint() {
    score--;
    updateScore();
    checkGame();
}

// -------------------------
// Şut Sistemi
// -------------------------

goal.addEventListener('click', function (e) {

    if (score >= 10 || score <= -3) return;

    if (!canShoot) {
        waitMessage();
        return;
    }

    canShoot = false;

    const rect = goal.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Top hareketi
    ball.style.left = (clickX - 12) + 'px';
    ball.style.top = (clickY - 12) + 'px';

    // Kale 3x3 bölge
    const cellW = rect.width / 3;
    const cellH = rect.height / 3;

    const shotX = Math.floor(clickX / cellW);
    const shotY = Math.floor(clickY / cellH);

    // Kaleci rastgele
    const keeperX = Math.floor(Math.random() * 3);
    const keeperY = Math.floor(Math.random() * 3);

    goalkeeper.style.left = (keeperX * cellW + cellW / 2 - 87) + 'px';
    goalkeeper.style.top = (keeperY * cellH + cellH / 2 - 87) + 'px';

    // Sonuç
    setTimeout(() => {

        if (shotX === keeperX && shotY === keeperY) {

            score--;
            message.textContent = 'Kaleci Kurtardı!';

        } else {

            score++;
            message.textContent = 'GOOOOOOL!';

        }

        updateScore();
        checkGame();

    }, 250);

    // 3 saniye bekleme
    setTimeout(() => {
        canShoot = true;
    }, 3000);
});
