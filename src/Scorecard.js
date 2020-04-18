class Scorecard {
  constructor() {
    this.currentRoll = 1
    this.currentFrame = 0
    this.frames = [
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame(),
      new Frame()
    ]
  }

  record(score) {
    
    let frame = this.frames[this.currentFrame];
    let previousFrame = this.currentFrame != 0 ? this.frames[this.currentFrame - 1] : false;
    
    if (this.currentRoll === 1) {
      frame.roll1 = score;
      this.assignSpareBonus(previousFrame, score);
      this.assignStrikeBonus(previousFrame, score);
      if (score == 10) {
        this.currentFrame++
      }
      else {
        this.currentRoll = 2;
      }
    }
    else {
      frame.roll2 = score;
      this.assignStrikeBonus(previousFrame, score);
      this.currentRoll = 1
      this.currentFrame++
    }
  }

  assignStrikeBonus(previousFrame, score) {
    if (previousFrame != false && previousFrame.isStrike()) {
      previousFrame.strikeBonus += score;
    }
  }

  assignSpareBonus(previousFrame, score) {
    if (previousFrame != false && previousFrame.isSpare()) {
      previousFrame.spareBonus = score;
    }
  }

  runningTotal(frame) {
    let total = 0;
    for (let i = 0; i <= frame; i++) {
      total += this.frames[i].total();
    }
    return total;
  }
}

