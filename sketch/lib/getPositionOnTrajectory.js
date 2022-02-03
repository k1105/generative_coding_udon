const getPositionOnTrajectory = (t, trajectory) => {
  //三次ベジェ曲線の組み合わせで構成された
  const i = Math.floor(t);
  const ratio = t - i;
  const a0 = trajectory[i % trajectory.length];
  const a1 = trajectory[(i + 1) % trajectory.length];
  const input = [
    [a0.position[0], a0.position[1]],
    [a0.oppositeHandle[0], a0.oppositeHandle[1]],
    [a1.handle[0], a1.handle[1]],
    [a1.position[0], a1.position[1]],
  ];
  return getPositionOnCubicBezier(input, ratio);
};

const getPositionOnCubicBezier = (p, t) => {
  if (p.length !== 4) {
    console.log("error! : input array is not cubic bezier!");
  }
  return [
    p[0][0] * (1 - t) ** 3 +
      p[1][0] * 3 * (1 - t) ** 2 * t +
      p[2][0] * 3 * (1 - t) * t ** 2 +
      p[3][0] * t ** 3,
    p[0][1] * (1 - t) ** 3 +
      p[1][1] * 3 * (1 - t) ** 2 * t +
      p[2][1] * 3 * (1 - t) * t ** 2 +
      p[3][1] * t ** 3,
  ];
};
