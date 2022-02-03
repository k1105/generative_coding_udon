function setup() {
  num = 30;
  createCanvas((w = windowWidth), (h = windowHeight));
  stroke(255, 255, 230);
  strokeWeight(20);
  pi = Math.PI;

  p = [];

  resetPosition();

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
    p[i].updateAngle(p[i].initAngle + 2 * pi * sin(delta));
  }

  // draw Udon
  for (i = 0; i < num - 1; i++) {
    next = (i + 1) % num;

    push();
    if (i == 0 || i == num - 1) {
      strokeCap(ROUND);
    } else {
      strokeCap(SQUARE);
    }
    strokeWeight(21);
    stroke(100, 100, 100);
    bezierFromAnchor(p[i], p[next]);
    pop();

    bezierFromAnchor(p[i], p[next]);
  }
}

const resetPosition = () => {
  for (i = 0; i < num; i++) {
    k = random();
    r = 300 * k;
    theta = pi * 2 * random();
    position = [r * cos(theta) + w / 2, r * sin(theta) + h / 2];
    p[i] = new Anchor(
      position,
      100,
      k * (theta + pi / 2) + (1 - k) * (2 * pi * random())
    );
  }
};

const bezierFromAnchor = (a0, a1) => {
  bezier(
    a0.position[0],
    a0.position[1],
    a0.oppositeHandle[0],
    a0.oppositeHandle[1],
    a1.handle[0],
    a1.handle[1],
    a1.position[0],
    a1.position[1]
  );
};

// setInterval(resetPosition, 2000);

//p[0][1] = -(h / 4) * cos(angle) + init[0][1];
//p[1][1] = (h / 3) * sin(angle) + init[1][1];
//p[2][1] = (h / 5) * sin(angle) + init[2][1];
