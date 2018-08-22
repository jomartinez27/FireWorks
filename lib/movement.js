function calcOffset(time) {
  let frameGapTime = time - lastFrameRepaintTime
  lastFrameRepaintTime = time;
  let translateY = velocity * (frameGapTime/1000);
  return translateY;
}

function draw(time) {
  distance += calcOffset(time);
  if (distance > img.height) { distance = 0;}
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.save();
    c.translate(0, distance);
    c.drawImage(img, 0, 0);
    c.drawImage(img, 0, -img.height+1);

    requestAnimationFrame(draw);

    c.restore();
  }


function init() {
  let canvas = document.getElementsByTagName("canvas")[0]
  let c = canvas.getContext('2d');

  let img = document.getElementsByTagName('img')[0]
  let velocity = 100;
  let distance = 0;
  let lastFrameRepaintTime = 0;

  calcOffset(time)
  draw(time)
}

function start() {
  lastFrameRepaintTime = window.performance.now();
  requestAnimationFrame(draw);
}

start();
