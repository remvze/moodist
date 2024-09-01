import JSConfetti from 'js-confetti';

export const addConfetti = () => {
  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    confettiColors: [
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#ec4899',
      '#f43f5e',
      '#fb923c',
      '#eab308',
      '#22c55e',
    ],
  });
};
