type Motion = {
  hidden: {
    [key: string]: number | string;
  };
  show: {
    [key: string]: number | string;
  };
};

export function fade(): Motion {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
}

export function scale(from = 0.85, to = 1): Motion {
  return {
    hidden: { scale: from },
    show: { scale: to },
  };
}

export function slideX(from = -10, to = 0): Motion {
  return {
    hidden: { x: from },
    show: { x: to },
  };
}

export function slideY(from = -10, to = 0): Motion {
  return {
    hidden: { y: from },
    show: { y: to },
  };
}

export function mix(...motions: Array<Motion>): Motion {
  let hidden = {};
  let show = {};

  motions.forEach(motion => {
    if (motion.hidden) hidden = { ...hidden, ...motion.hidden };
    if (motion.show) show = { ...show, ...motion.show };
  });

  return { hidden, show };
}
