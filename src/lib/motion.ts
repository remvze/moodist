type Motion = {
  hidden: {
    [key: string]: number | string;
  };
  show: {
    [key: string]: number | string;
  };
};

/**
 * Creates a fade motion object with opacity transition.
 *
 * @returns {Motion} An object containing the hidden and show states for a fade transition.
 */
export function fade(): Motion {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
}

/**
 * Creates a scale motion object with scaling transition.
 *
 * @param {number} [from=0.85] - The initial scale value for the hidden state.
 * @param {number} [to=1] - The final scale value for the show state.
 * @returns {Motion} An object containing the hidden and show states for a scale transition.
 */
export function scale(from = 0.85, to = 1): Motion {
  return {
    hidden: { scale: from },
    show: { scale: to },
  };
}

/**
 * Creates a slide motion object with horizontal sliding transition.
 *
 * @param {number} [from=-10] - The initial x position for the hidden state.
 * @param {number} [to=0] - The final x position for the show state.
 * @returns {Motion} An object containing the hidden and show states for a horizontal slide transition.
 */
export function slideX(from = -10, to = 0): Motion {
  return {
    hidden: { x: from },
    show: { x: to },
  };
}

/**
 * Creates a slide motion object with vertical sliding transition.
 *
 * @param {number} [from=-10] - The initial y position for the hidden state.
 * @param {number} [to=0] - The final y position for the show state.
 * @returns {Motion} An object containing the hidden and show states for a vertical slide transition.
 */
export function slideY(from = -10, to = 0): Motion {
  return {
    hidden: { y: from },
    show: { y: to },
  };
}

/**
 * Combines multiple motion objects into a single motion object.
 *
 * This function merges the hidden and show states of the provided motion objects
 * into a single motion object.
 *
 * @param {...Motion} motions - The motion objects to be combined.
 * @returns {Motion} An object containing the combined hidden and show states.
 */
export function mix(...motions: Array<Motion>): Motion {
  let hidden = {};
  let show = {};

  motions.forEach(motion => {
    if (motion.hidden) hidden = { ...hidden, ...motion.hidden };
    if (motion.show) show = { ...show, ...motion.show };
  });

  return { hidden, show };
}
