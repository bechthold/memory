'use strict';

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let showCardTimeout = 1000;

const gaming = {
  flipCard(evt) {
    const current = evt.currentTarget;

    // block if already opened two cards
    if (lockBoard) return;
    // block the second click on the same card
    if (current === firstCard) return;

    current.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = current;
      return;
    } else {
      secondCard = current;
    }

    gaming.checkForMatch();
    gaming.endOfGame();
  },

  checkForMatch() {
    // if both cards have the same picture
    if (firstCard.dataset.pictureName === secondCard.dataset.pictureName) {
      // console.log('Equal!');
      gaming.disableCards();
    } else {
      // console.log('Not qual!');
      gaming.unflipCards();
    }
    // add move (+1)
    move.updateMove();
  },

  // hide the same cards
  disableCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.style.visibility = 'hidden';
      secondCard.style.visibility = 'hidden';
      gaming.resetBoard();
    }, showCardTimeout);

    // renew an information about flipped cards to define a win situation
    settings.elements.flippedCards = dom.$$('.flip');
  },

  // flip the cards back over
  unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      gaming.resetBoard();
    }, showCardTimeout);
  },

  resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  },

  endOfGame() {
    let cardSetAmount = settings.elements.cards.length;
    let flippedCardsAmount = settings.elements.flippedCards.length;

    // if all cards are hidden
    if (flippedCardsAmount === cardSetAmount) {
      timer.stopTimer();
      gaming.showCongratulations();
      gaming.tryAgainButton();
    }
  },

  showCongratulations() {
    // create an element with congratulations after the end of the game
    settings.elements.finishMessage = dom.create(
      false,
      'div',
      dom.$('.game'),
      'finish-message'
    );
    const congratulations = dom.create(
      `Congratulations!<br>${gaming.saveResultsAndMakeMessage()}`,
      'p',
      settings.elements.finishMessage,
      'congratulations'
    );

    // this message will be shown after disappearance of the last pair
    setTimeout(() => {
      congratulations.classList.add('active');
    }, showCardTimeout);
  },

  saveResultsAndMakeMessage() {
    let currentSeconds = helpers.timeToSeconds(settings.timer);

    if (settings.seconds) {
      if (settings.seconds > currentSeconds) {
        localStorage.setItem(
          `seconds${settings.amountOfCards}`,
          currentSeconds
        );
        return `You set a new record!`;
      } else {
        return `It was good, but you can better`;
      }
    } else {
      localStorage.setItem(`seconds${settings.amountOfCards}`, currentSeconds);
      return `It was your first game`;
    }
  },

  showBestTime() {
    if (settings.seconds)
      settings.elements.bestTime.textContent = `Last record: ${helpers.secondsToTime(
        settings.seconds
      )}`;
    else settings.elements.bestTime.textContent = 'No records yet';
  },

  tryAgainButton() {
    const button = dom.create(
      'Try again',
      'button',
      settings.elements.finishMessage,
      'try-again-button'
    );

    setTimeout(() => {
      button.classList.add('active');
    }, showCardTimeout);

    button.addEventListener('click', () => location.reload());
  },
};
