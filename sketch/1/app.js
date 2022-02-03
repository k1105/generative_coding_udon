function setup() {
  createCanvas((w = windowWidth), (h = windowHeight));
  background(0);
  stroke(255);
  strokeWeight(20);
  start = [w / 3, h / 2];
  end = [(2 * w) / 3, h / 2];
  angle = 0;
  delta = 0;
  i = 0;
  offset = 30;
}

function draw() {
  background(0);
  noFill();
  delta += 0.01;
  angle += (Math.PI / 100) * noise(delta);
  a = [w / 3 + 100 * cos(angle), h / 2 + 100 * sin(angle)];
  b = [(2 * w) / 3 - 100 * cos(angle), h / 2 - 100 * sin(angle)];

  for (i = -20; i < 20; i++) {
    push();
    translate(0, i * offset);
    bezier(start[0], start[1], a[0], a[1], b[0], b[1], end[0], end[1]);
    pop();
  }
}
