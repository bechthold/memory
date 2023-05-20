let moves = 0;

const move = {
  updateMove() {
    moves += 1;
    move.showMove();
  },
  
  showMove() {
    settings.elements.move.textContent = `Move: ${moves}`;
  }
};
