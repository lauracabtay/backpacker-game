import p5 from 'p5';
import { BaseObject } from './baseObject';

let signImage;

class Sign extends BaseObject {
  static signs = [];
  constructor(x, y, message, onClick) {
    super(x, y, 32, 32, message);

    this.message = message;
    this.callback = onClick;

    Sign.signs.push(this);

    const bypassDiv = document.getElementById(this.id);
    bypassDiv?.addEventListener("click", this.callback);
  }

  display() {
    const pos = this.getPosNoTranslation();
    p5.image(signImage, pos[0], pos[1]);

    if (this.pointCircleCollision(p5.mouseX, p5.mouseY)) {
      p5.fill(255, 255, 255);
      p5.text(this.message, pos[0], pos[1]);

      if (p5.mouseIsPressed === true) {
        this.callback();
      }
    }
  }
}
