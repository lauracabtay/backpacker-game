class BaseObject {
  static allObjects = [];
  static scaleFactor = 1;

  /**
   * @param {number} x x pos in tile space
   * @param {number} y y pos in tile space
   * @param {number} w width of object in screen space
   * @param {number} h height of object in screen space
   */
  constructor(x, y, w, h, id) {
    this.translation = [0, 0];
    this.pos = [x, y];
    this.size = [w, h];

    this.id = this.messageToId(id);

    BaseObject.allObjects.push(this);
    this.generateAABBDiv();
  }

  /**
   * @returns the translated and scaled position
   */
  getPos() {
    return [0, 1].map(
      (i) =>
        this.pos[i] * (this.size[i] * BaseObject.scaleFactor) +
        this.translation[i]
    );
  }

  getPosNoTranslation() {
    return [0, 1].map(
      (i) => this.pos[i] * (this.size[i] * BaseObject.scaleFactor)
    );
  }
  /**
   * Translates all objects
   * @param {int} x x axis translation
   * @param {int} y y axis translation
   */
  static translateAll(x, y) {
    for (const o of BaseObject.allObjects) {
      o.translation = [x, y];
    }
  }

  changeCursor(result) {
    if (result) {
      cursor(HAND);
    }
  }

  /**
   * Calculates if a point is inside of an Axis Aligned Bounding Box
   * @param {number} px x pos of point in screen space
   * @param {number} py y pos of point in screen space
   */
  pointAABBCollision(px, py) {
    const pos = this.getPos();
    const result =
      px > pos[0] &&
      py > pos[1] &&
      px < pos[0] + this.size[0] * BaseObject.scaleFactor &&
      py < pos[1] + this.size[1] * BaseObject.scaleFactor;
    this.changeCursor(result);
    return result;
  }

  /**
   * Calculates if a point is inside of a Circle (uses width as radius)
   * @param {number} px x pos of point in screen space
   * @param {*} py y pos of point in screen space
   */
  pointCircleCollision(px, py, dx = 0, dy = 0) {
    const pos = this.getPos();
    const distSqrt = (pos[0] - dx - px) ** 2 + (pos[1] - dy - py) ** 2;
    const result = distSqrt < (this.size[0] * BaseObject.scaleFactor) ** 2;
    this.changeCursor(result);
    return result;
  }

  getAABB() {
    return this.getPosNoTranslation().concat(
      this.size.map((val) => val * BaseObject.scaleFactor)
    );
  }

  messageToId(message) {
    return message.replace(" ", "-").toLowerCase();
  }

  generateAABBDiv() {
    const aabbContainer = document.getElementById("aabbLinks");
    aabbContainer.insertAdjacentHTML("beforeend", `<a id="${this.id}"> </a>`);
  }
}
