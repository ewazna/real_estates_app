export function calculateNumberOfVisibleCards(
  width: number,
  gap: number,
): number {
  const numberOfCardsInView = Math.ceil(window.innerWidth / (width + gap));

  if (numberOfCardsInView % 2 === 0) {
    return numberOfCardsInView + 1;
  }
  return numberOfCardsInView;
}
