var cloudPosition = 100;
setInterval(function () {
  cloudPosition += 100;
  document.querySelector('.center-bolt').style.transform = 'translate(' + cloudPosition + 'px)';
  document.querySelector('.center-bolt').style.display = 'flex';
  if (window.innerWidth - 100 < cloudPosition) {
    cloudPosition = (window.innerWidth * -1);
    document.querySelector('.center-bolt').style.display = 'none'
  }
},2000);
document.addEventListener('click', function (e) {
  Meteor.call('clicked');
    var toLeft, toTop,
      lightning = document.querySelector('._' + getRandomInt(1,9)),
      core = document.querySelector('.core'),
      widthX = e.pageX - core.getBoundingClientRect().left,
      widthY = e.pageY - core.getBoundingClientRect().top,
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
});
document.addEventListener('mousemove', function (e) {
  Meteor.call('mouseMove', e.pageX, e.pageY);
});
function animate (element, interval) {
  element.classList.remove('hidden');
  document.querySelector('.center-bolt').style.opacity = '1';
  document.querySelector('body').style.backgroundColor = '#2c3e50';
  setTimeout(function() {
    element.classList.add('hidden');
    document.querySelector('.center-bolt').style.opacity = '0.4';
    document.querySelector('body').style.backgroundColor = 'black';
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