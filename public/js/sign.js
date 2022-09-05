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
    image(signImage, pos[0], pos[1]);

    if (this.pointCircleCollision(mouseX, mouseY)) {
      fill(255, 255, 255);
      text(this.message, pos[0], pos[1]);

      if (mouseIsPressed === true) {
        this.callback();
      }
    }
  }
}
