// script.js
const cardGrid = document.getElementById("cardGrid");
const restartBtn = document.getElementById("restartBtn");
const movesDisplay = document.getElementById("moves");

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;

const symbols = ["🍎", "🍊", "🍓", "🍒", "🍉", "🍇", "🍌", "🍍"];
const cardSymbols = [...symbols, ...symbols]; // Duplicate symbols to create pairs

// Shuffle the symbols
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Initialize the game
function initializeGame() {
    cards = shuffle(cardSymbols);
    matchedCards = 0;
    moves = 0;
    movesDisplay.textContent = `Moves: ${moves}`;
    cardGrid.innerHTML = "";

    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.textContent = ""; // Hidden initially
        card.addEventListener("click", handleCardClick);
        cardGrid.appendChild(card);
    });
}

// Handle card click
function handleCardClick(e) {
    const clickedCard = e.target;

    if (flippedCards.length < 2 && !clickedCard.classList.contains("flipped")) {
        clickedCard.classList.add("flipped");
        clickedCard.textContent = clickedCard.dataset.symbol;
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards += 2;
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }

    flippedCards = [];
    moves++;
    movesDisplay.textContent = `Moves: ${moves}`;

    // Check for win condition
    if (matchedCards === cards.length) {
        setTimeout(() => alert(`You won in ${moves} moves!`), 500);
    }
}

// Restart the game
restartBtn.addEventListener("click", initializeGame);

// Start the game
initializeGame();
