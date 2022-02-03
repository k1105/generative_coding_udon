function setup() {
  num = 20;
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(255, 255, 230);
  strokeWeight(20);
  pi = Math.PI;

  p = [];

  resetPosition();

  init = p;

  angle = pi / 4;
  delta = 0;
  i = 0;
  offset = 30;
}

function draw() {
  background(2, 63, 51);
  noFill();

  delta += 0.01;
  angle += (pi / 100) * noise(delta);

  for (i = 0; i < num; i++) {
    next = (i + 1) % num;
    p[i].updateAngle(p[i].angle + (pi / 100) * noise(delta));
  }

  // draw Udon
  for (i = 0; i < num - 1; i++) {
    next = (i + 1) % num;

    bezier(
      p[i].position[0],
      p[i].position[1],
      p[i].oppositeHandle[0],
      p[i].oppositeHandle[1],
      p[next].handle[0],
      p[next].handle[1],
      p[next].position[0],
      p[next].position[1]
    );
  }
}

const resetPosition = () => {
  for (i = 0; i < num; i++) {
    position = [w * (random() - 0.5) + w / 2, h * (random() - 0.5) + h / 2];
    p[i] = new Anchor(position, 300, pi * 2 * random());
  }

  init = p;
};

// setInterval(resetPosition, 2000);

//p[0][1] = -(h / 4) * cos(angle) + init[0][1];
//p[1][1] = (h / 3) * sin(angle) + init[1][1];
//p[2][1] = (h / 5) * sin(angle) + init[2][1];
