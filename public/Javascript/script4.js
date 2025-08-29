const gridContainer = document.querySelector(".grid-container");
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".game-score").textContent = `Score: ${score}`;

const cards = [
    { src: 'images/a.png', answer: 'A' },
    { src: 'images/b.png', answer: 'B' },
    { src: 'images/c.png', answer: 'C' },
    { src: 'images/d.png', answer: 'D' },
    { src: 'images/e.png', answer: 'E' },
    { src: 'images/f.png', answer: 'F' },
    { src: 'images/g.png', answer: 'G' },
    { src: 'images/h.png', answer: 'H' },
    { src: 'images/i.png', answer: 'I' },
    { src: 'images/j.png', answer: 'J' },
    { src: 'images/k.png', answer: 'K' },
    { src: 'images/l.png', answer: 'L' },
    { src: 'images/m.png', answer: 'M' },
    { src: 'images/n.png', answer: 'N' },
    { src: 'images/o.png', answer: 'O' },
    { src: 'images/p.png', answer: 'P' },
    { src: 'images/q.png', answer: 'Q' },
    { src: 'images/r.png', answer: 'R' },
    { src: 'images/s.png', answer: 'S' },
    { src: 'images/t.png', answer: 'T' },
    { src: 'images/u.png', answer: 'U' },
    { src: 'images/v.png', answer: 'V' },
    { src: 'images/w.png', answer: 'W' },
    { src: 'images/x.png', answer: 'X' },
    { src: 'images/y.png', answer: 'Y' },
    { src: 'images/z.png', answer: 'Z' },
    // words and sentences
    { src: 'images/hello.png', answer: 'HELLO' },
    { src: 'images/thank_you.png', answer: 'THANK YOU' },
    { src: 'images/i_love_you.png', answer: 'I LOVE YOU' },
    { src: 'images/sorry.png', answer: 'SORRY' },
    { src: 'images/y_r_w.png', answer: 'YOU ARE WELCOME' },
    { src: 'images/yes.png', answer: 'YES' },
    { src: 'images/no.png', answer: 'NO' },
    { src: 'images/house.png', answer: 'HOUSE' },
    { src: 'images/good_bye.png', answer: 'GOOD BYE' },
    { src: 'images/family.png', answer: 'FAMILY' }
];


function shuffleCards() {
    let currentIndex = cards.length, randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    shuffleCards();
    const selectedCards = cards.slice(0, 10);
    const cardDeck = [...selectedCards, ...selectedCards]; // Duplicating for pairs
    shuffleCards(cardDeck); // Shuffle again to ensure pairs are spread out

    cardDeck.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("gcard");
        cardElement.setAttribute("data-name", card.answer); // Fixed: use answer, not name
        cardElement.innerHTML = `
        <div class="front">
            <img class="front-image" src=${card.src} alt="${card.answer}" />
        </div>
        <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    });
}

function flipCard() {
    if (lockBoard) return; // Prevent interaction if the board is locked
    if (this === firstCard) return; // Prevent clicking the same card twice

    this.classList.add("gcard-flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    score++;
    document.querySelector(".game-score").textContent = `Score: ${score}`;
    lockBoard = true; // Lock the board after selecting the second card

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("gcard-flipped");
        secondCard.classList.remove("gcard-flipped");
        resetBoard();
    }, 900);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false]; // Reset the board
}

function restart() {
    resetBoard();
    score = 0;
    document.querySelector(".game-score").textContent = `Score: ${score}`;
    gridContainer.innerHTML = "";
    generateCards();
}

// Start the game by generating cards
generateCards();
