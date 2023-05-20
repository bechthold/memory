const components = {
  contentArea(cardsAmount, contents, parent) {
    settings.elements.cards = [];

    for (let content of contents.slice(0, cardsAmount / 2)) {
      // add two instances of each card from JSON
      components.content(content, parent);
      components.content(content, parent);
    }
    // set width and height for card in playground
    components.setCalculatedGameField(cardsAmount);
    components.shuffleCards(settings.elements.cards);
  },

  content(content, parent) {
    const container = dom.create(false, 'div', parent, 'game__card');
    //console.log(content.text);

    if (content.frontImage) {
      let elImg = dom.create(false, 'div', container, 'front');
      elImg.style.backgroundImage = `url(${content.frontImage})`;
    }

    if (content.backImage) {
      let elImg = dom.create(false, 'div', container, 'back');
      elImg.style.backgroundImage = `url(${content.backImage})`;
    }

    // set dataset attribute to use it for comparing of cards
    let name = content.frontImage.split('/');
    container.setAttribute('data-picture-name', `${name[name.length - 1]}`);
    settings.elements.cards.push(container);

    return container;
  },

  setCalculatedGameField(cardsAmount) {
    const margin = '10px';
    const setCardDimensions = (widthPercent, heightPercent) => {
      settings.elements.cards.forEach((card) => {
        card.style.width = `calc(${widthPercent}% - ${margin})`;
        card.style.height = `calc(${heightPercent}% - ${margin})`;
      });
    };

    const cardDimensions = {
      12: {width: 25, height: 33.33},
      16: {width: 25, height: 25},
      20: {width: 20, height: 25},
      24: {width: 16.66, height: 25},
      30: {width: 16.66, height: 20},
      36: {width: 16.66, height: 16.66},
    };

    const dimensions = cardDimensions[cardsAmount];
    if (dimensions) {
      setCardDimensions(dimensions.width, dimensions.height);
    }
  },

  shuffleCards(contents) {
    const createNumber = (min, max) =>
      ~~(Math.random() * (max - min + 1) + min);

    for (let i = 0; i < contents.length; i++) {
      let randomIndex = createNumber(0, contents.length - 1);
      let tmp = contents[i];
      contents[i] = contents[randomIndex];
      contents[randomIndex] = tmp;
    }
    //console.log(contents);
    for (let content of contents) {
      content.parentElement.append(content);
    }
  },

  presetContent(
    parent,
    containerClassName,
    pTagContent,
    pTagClass,
    btnTagClass,
    btnTagOneContent,
    btnTagDataAttrName,
    btnTagOneDataAttrValue,
    btnTagTwoContent,
    btnTagTwoDataAttrValue
  ) {
    const container = dom.create(false, 'div', parent, containerClassName);

    dom.create(pTagContent, 'p', container, pTagClass);

    const btnTagOne = dom.create(
      btnTagOneContent,
      'button',
      container,
      btnTagClass
    );
    btnTagOne.setAttribute(btnTagDataAttrName, btnTagOneDataAttrValue);

    const btnTagTwo = dom.create(
      btnTagTwoContent,
      'button',
      container,
      btnTagClass
    );
    btnTagTwo.setAttribute(btnTagDataAttrName, btnTagTwoDataAttrValue);

    settings.elements.presetButtons.push(btnTagOne);
    settings.elements.presetButtons.push(btnTagTwo);

    return container;
  },

  presetContentArea(parent) {
    settings.elements.presetButtons = [];

    const headerContainer = dom.create(false, 'div', parent, 'preset__header');
    dom.create('Memory', 'p', headerContainer, false);

    const level = dom.create(false, 'div', parent, 'level');
    const cardSet = dom.create(false, 'div', parent, 'card-set');

    components.presetContent(
      level,
      'easy-level',
      'Easy level:',
      'level__header',
      'level__button',
      '12 cards',
      'data-cards',
      '12',
      '16 cards',
      '16'
    );

    components.presetContent(
      level,
      'medium-level',
      'Medium level:',
      'level__header',
      'level__button',
      '20 cards',
      'data-cards',
      '20',
      '24 cards',
      '24'
    );

    components.presetContent(
      level,
      'hard-level',
      'Hard level:',
      'level__header',
      'level__button',
      '30 cards',
      'data-cards',
      '30',
      '36 cards',
      '36'
    );

    components.presetContent(
      cardSet,
      'child-card-set',
      'For children:',
      'card-set__header',
      'card-set__button',
      'Pokemons',
      'data-card-set',
      'pokemons',
      'Fruits',
      'fruits'
    );

    components.presetContent(
      cardSet,
      'adult-card-set',
      'For adults:',
      'card-set__header',
      'card-set__button',
      'Programming',
      'data-card-set',
      'programming',
      'Flags',
      'flags'
    );

    const start = dom.create(false, 'div', parent, 'game__start');
    const startButton = dom.create('Start game', 'button', start, false);

    startButton.disabled = true;
    settings.elements.startButton = startButton;
  },
};
