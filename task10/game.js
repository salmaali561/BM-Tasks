const images = [
    'assets/istockphoto-1284317508-612x612.jpg', 'assets/istockphoto-1284317508-612x612.jpg',
    'assets/istockphoto-1297171607-612x612.jpg', 'assets/istockphoto-1297171607-612x612.jpg',
    'assets/istockphoto-1299116725-612x612.jpg', 'assets/istockphoto-1299116725-612x612.jpg',
    'assets/istockphoto-1317331156-612x612.jpg', 'assets/istockphoto-1317331156-612x612.jpg',
    'assets/istockphoto-1321128933-612x612.jpg', 'assets/istockphoto-1321128933-612x612.jpg',
    'assets/istockphoto-1323176663-612x612.jpg', 'assets/istockphoto-1323176663-612x612.jpg',
    'assets/istockphoto-1332100919-612x612.jpg', 'assets/istockphoto-1332100919-612x612.jpg',
    'assets/istockphoto-1368777840-612x612.jpg', 'assets/istockphoto-1368777840-612x612.jpg'
];

let firstCard, secondCard, lockBoard, matchCount, timeoutId;

const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

function shuffle(array) {
    array.sort(function() {
        return Math.random() - 0.5;
    });
}

function createBoard() {
    gameBoard.innerHTML = '';
    shuffle(images);
    matchCount = 0;
    images.forEach(function(image) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${image}" /></div>
            </div>
        `;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
    resetBoard();
}

function handleCardClick(e) {
    if (lockBoard || e.currentTarget === firstCard) return;
    e.currentTarget.classList.add('flipped');

    if (!firstCard) {
        firstCard = e.currentTarget;
        startFlipBackTimer();
    } else {
        secondCard = e.currentTarget;
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    clearTimeout(timeoutId);

    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCards();
        matchCount += 2;
        if (matchCount === images.length) {
            message.textContent = 'You won!';
            console.log('All matches found, you won!');
        }
    } else {
        setTimeout(unflipCards, 1000);
    }
}

function disableCards() {
    firstCard.removeEventListener('click', handleCardClick);
    secondCard.removeEventListener('click', handleCardClick);
    resetBoard();
}

function unflipCards() {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startFlipBackTimer() {
    timeoutId = setTimeout(function() {
        if (firstCard) {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }
        resetBoard();
    }, 5000);
}

resetButton.addEventListener('click', function() {
    matchCount = 0;
    message.textContent = '';
    createBoard();
});

createBoard();
