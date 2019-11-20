class MemoryGame {
    constructor(totalTime, cards) {
        this.totalTime = totalTime;
        this.cardsArr = cards;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('remaining-time');
        this.movecounter = document.getElementById('moves');
    }

    startGame() {
        this.checkCard = null;
        this.totalMoves = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArr);
            this.countdown = this.startCountDown();
            this.busy = false;
        }, 300)
        this.hideCards();
        this.timer.innerHTML = this.timeRemaining;
        this.movecounter.innerHTML = this.totalMoves;
    }

    hideCards() {
        this.cardsArr.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }

    shuffleCards() {
        for (let i = this.cardsArr.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArr[randomIndex].style.order = i;
            this.cardsArr[i].style.order = randomIndex;
        }
    }

    startCountDown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerHTML = this.timeRemaining;
            if (this.timeRemaining === 0) {
                this.gameOver();
            }
        }, 1000);
    }

    win() {
        clearInterval(this.countdown);
        document.getElementById("win").classList.add("visible");
    }

    gameOver() {
        clearInterval(this.countdown);
        document.getElementById("gameover").classList.add("visible");
    }

    canFlipcard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.checkCard;
    }

    flipCard(card) {
        if (this.canFlipcard(card)) {
            card.classList.add("visible");
            if (this.checkCard) {
                this.checkForCardMatch(card);
            } else {
                this.checkCard = card;
            }
        }
    }

    checkCardType(card) {
        return card.getElementsByClassName("iconvalue")[0].src;
    }

    checkForCardMatch(card) {
        this.totalMoves++;
        this.movecounter.innerHTML = this.totalMoves;
        if (this.checkCardType(card) === this.checkCardType(this.checkCard)) {
            this.cardMatch(card, this.checkCard);
        } else {
            this.noMatch(card, this.checkCard);
        }

        this.checkCard = null;
    }

    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");

        if (this.matchedCards.length === this.cardsArr.length) {
            setTimeout(() => {    
            this.win();
            }, 1200);
        }
    }

    noMatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }

}


let overlays = [...document.getElementsByClassName("overlay")];
let cards = [...document.getElementsByClassName("card")];
let game = new MemoryGame(60, cards);

overlays.forEach(overlay => {
    overlay.addEventListener("click", () => {
        overlay.classList.remove("visible");
        game.startGame();
    });
});

cards.forEach(card => {
    card.addEventListener("click", () => {
        game.flipCard(card);
    })
})





