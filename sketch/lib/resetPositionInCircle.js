const resetPositionInCircle = (num, x, y, radius) => {
  let p = new Array(num);
  for (i = 0; i < num; i++) {
    k = random();
    theta = pi * 2 * random();
    const position = [radius * cos(theta) + x, radius * sin(theta) + y];
    p[i] = new Anchor(
      position,
      radius,
      k * (theta + pi / 2) + (1 - k) * (2 * pi * random())
    );
  }

  return p;
};
