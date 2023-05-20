'use strict';

const init = () => {
  dom.domMapping();

  components.presetContentArea(settings.elements.preset);
  dom.appendEventListeners();
};

document.addEventListener('DOMContentLoaded', init);
