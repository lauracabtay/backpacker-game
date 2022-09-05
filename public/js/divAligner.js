

function getCanvasPosition() {
	const canvas = document.getElementById("defaultCanvas0");
	return [canvas?.offsetLeft, canvas?.offsetTop]
}

function getCanvasSize() {
	const canvas = document.getElementById("defaultCanvas0");
	return [canvas?.clientWidth, canvas?.clientHeight];
}

function alignDiv(offsetX=0, offsetY=0) {
  const pos = getCanvasPosition();
  const size = getCanvasSize();

  const storyDiv = document.getElementById("story");
  storyDiv.style.left = `${Math.abs(pos[0] + offsetX)}px`;
  storyDiv.style.top = `${Math.abs(pos[1] + offsetY)}px`;
  storyDiv.style.maxWidth = `${backPack.width - 25}px`;
  storyDiv.style.maxHeight = `${backPack.height * 0.5}px`;
  storyDiv.style.width = `${backPack.width - 25}px`;
  storyDiv.style.height = `${backPack.height * 0.5}px`;
}
