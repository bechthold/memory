'use strict';

const dom = {
  $(selector) {
    return document.querySelector(selector);
  },
  $$(selector) {
    return [...document.querySelectorAll(selector)];
  },

  domMapping() {
    settings.elements.main = dom.$('main');
    settings.elements.game = dom.$('.game__content');
    settings.elements.preset = dom.$('.preset__content');
    settings.elements.flippedCards = [];

    // the information from the top of the playground
    settings.elements.timerText = dom.$('#timer');
    settings.elements.move = dom.$('#move');
    settings.elements.bestTime = dom.$('#best-time');
  },

  create(content, type, parent, className) {
    const newEl = document.createElement(type);
    if (content) newEl.innerHTML = content;
    if (className) newEl.className = className;
    if (parent) parent.append(newEl);

    return newEl;
  },

  appendEventListeners() {
    settings.elements.presetButtons.forEach((presetButton) =>
      presetButton.addEventListener('click', choice.choiceOption)
    );
    settings.elements.startButton.addEventListener('click', choice.startGame);
  },

  gameEventListeners() {
    settings.elements.cards.forEach((card) =>
      card.addEventListener('click', gaming.flipCard)
    );
  },
};
