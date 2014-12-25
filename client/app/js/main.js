document.addEventListener('click', function (e) {
  var lightning = document.querySelector('.lightning'),
    core = document.querySelector('.core'),
    width = findWidth({x: e.pageX, y: e.pageY}, {x: core.getBoundingClientRect().x, y: core.getBoundingClientRect().y});

  if (width > 110) {
    lightning.style.width =  Math.round(width/2) + 'px';
    animate(lightning, 150);
  }
});

function animate (element, interval) {
  element.classList.remove('hidden');
  setTimeout(function() {
    element.classList.add('hidden');
  }, interval);

  return element;
}

function findWidth (firstPoint, secondPoint) {
  var result, widthX, widthY;
  widthX = firstPoint.x - secondPoint.x;
  widthY = firstPoint.y - secondPoint.y;
  result = Math.pow(Math.pow(widthX, 2) + Math.pow(widthY, 2), 0.5);
  return result;
}