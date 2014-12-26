var counter =0;
document.addEventListener('mousemove', function (e) {
  if (counter != 8) {
    counter += 1;
  }
  else {
    var toLeft, toTop,
      lightning = document.querySelector('._' + getRandomInt(1,9)),
      core = document.querySelector('.core'),
      widthX = e.pageX - core.getBoundingClientRect().x,
      widthY = e.pageY - core.getBoundingClientRect().y,
      width = findWidth(widthX, widthY),
      angle = findAngle(widthX, widthY);
    angle = angle > 0 ? angle + 90 : angle - 270;
    toTop = angle > 0 ? -width/4 : -width;
    toLeft = angle > 90 && angle < 180 ? 0 :
     angle > -360 && angle < -270 ? lightning.getBoundingClientRect().width/3 :
     -lightning.getBoundingClientRect().width/2;
    if (width > 110) {
      lightning.style.height = Math.round(width * 1.3) + 'px';
      lightning.style.left =  toLeft + 'px';
      lightning.style.top = toTop + 'px';
      lightning.style.transform = 'rotate(' + angle + 'deg)';
      animate(lightning, 100);
    }
    counter = 0;
  }
});

function animate (element, interval) {
  element.classList.remove('hidden');
  setTimeout(function() {
    element.classList.add('hidden');
  }, interval);

  return element;
}

function findWidth (widthX, widthY) {
  return Math.pow(Math.pow(widthX, 2) + Math.pow(widthY, 2), 0.5);
}

function findAngle(widthX, widthY) {
  var angle = Math.atan2(widthY, widthX);
  return  angle *= 180/Math.PI;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}