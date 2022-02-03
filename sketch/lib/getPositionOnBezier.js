const getPositionOnBezier = (p, t) => {
  if (p.length == 1) {
    return p[0];
  } else {
    const new_points = [];
    for (let i = 0; i < p.length - 1; i++) {
      const new_point = [
        p[i][0] * t + p[i + 1][0] * (1 - t),
        p[i][1] * t + p[i + 1][1] * (1 - t),
      ];
      new_points.push(new_point);
    }

    return getPositionOnBezier(new_points, t);
  }
};
