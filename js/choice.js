'use strict';

const choice = {
  choiceOption(evt) {
    const current = evt.currentTarget;

    // check selected level
    if (current.classList.contains('level__button')) {
      settings.elements.presetButtons.forEach((element) =>
        element.classList.remove('selected-level')
      );
      current.classList.add('selected-level');

      settings.amountOfCards = current.dataset.cards;
    }
    // check selected card-set
    if (current.classList.contains('card-set__button')) {
      settings.elements.presetButtons.forEach((element) =>
        element.classList.remove('selected-card-set')
      );
      current.classList.add('selected-card-set');

      settings.nameOfSet = current.dataset.cardSet;
    }
    // if both options are existed, do start button allowed to click
    if (settings.amountOfCards && settings.nameOfSet)
      settings.elements.startButton.disabled = false;
  },

  startGame() {
    // go to playground
    choice.changeSceneToGame();
    // load the file with JSON to make a playground
    ajax.loadJSON(`./data/${settings.nameOfSet}.json`, (data) => {
      components.contentArea(
        settings.amountOfCards,
        data,
        settings.elements.game
      );
      dom.gameEventListeners();
    });
    // read an amount of seconds from the last time for display the best time
    settings.seconds = localStorage.getItem(`seconds${settings.amountOfCards}`);

    timer.startTimer();
    move.showMove();
    gaming.showBestTime();
  },

  changeSceneToGame() {
    settings.elements.game.style.display = 'flex';
    settings.elements.preset.style.display = 'none';
  },
};
