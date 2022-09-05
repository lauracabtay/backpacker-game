import p5 from 'p5'

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

export async function getItems() {
  const response = await fetch("/users/backpack")
	const values = await response.json()
	return values;
}

function placeImageAt(xIndex, yIndex, imageToPlace) {
  const backPackWidth = p5.backPack.width;
  const backPackHeight = p5.backPack.height;
  const itemHeight = backPackHeight * 0.66; // <-- not arbitrary (% distance to the inv slots)

	// constraints
	const top = itemHeight;
	const bottom = backPackHeight;
	const left = -backPackWidth;
	const right = 0;

	// deductions
	const rowMultiplier = (bottom - top) / 2;
	const colMultiplier = backPackWidth / 3;

  const x = left + (colMultiplier * xIndex) + 25;
  const y = top + (rowMultiplier * yIndex);

	p5.image(imageToPlace, x, y);
}

function placeItems(items, indexStart=0) {
	let index = indexStart;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {

			if (index > items.length) return;

			const itemName = items[index];
			const img = p5.itemNameToImage[itemName];
			if (img)
				placeImageAt(j, i, img);

			index++;
		}
  }
}
