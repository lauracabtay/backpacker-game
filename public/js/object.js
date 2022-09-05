class CollectibleObject extends BaseObject {
  static objects = [];
  static objectImagesURI = [];
  static objectImages = [];

  constructor(name, imageIndex, x, y, onClick = () => {}, onHover = () => {}) {
    super(x, y, 32, 32, name);

    this.name = name;
    this.image = imageIndex;

    this.enabled = true;
    this.hidden = false;
		this.hideIfOwned();

    this.onClick = onClick;
    this.onHover = onHover;

    const bypassDiv = document.getElementById(this.id);
    bypassDiv?.addEventListener("click", this.onClick);
  }

  async hideIfOwned() {
    const result = await fetch("/users/backpack");
		const items = await result.json();

		if (this.getURIName()) {
			this.hidden = items.includes(this.getURIName())
			this.enabled = !items.includes(this.getURIName());
		}
  }

  updateImage() {
    this.image = CollectibleObject.objectImages[this.image];
    this.image.resize(0, 32 * BaseObject.scaleFactor);
  }

  getURIName() {
    return this.name.toUpperCase().replace(" ", "_");
  }

  update() {
    if (!this.enabled) return;
    if (this.pointCircleCollision(mouseX, mouseY)) {
      this.onHover(this);

      if (mouseIsPressed) {
        this.onClick(this);
        fetch(`/users/backpack/add/${this.getURIName()}`);
				window.location.reload();
      }
    }
  }

  display() {
    if (this.hidden) return;
    let pos = this.getPosNoTranslation();
    image(this.image, pos[0], pos[1]);
  }
}
