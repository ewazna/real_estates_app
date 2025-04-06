export function updatePageInfo(
  currentPage: number,
  numbersOfProperties: number,
) {
  const minNumber = Math.min(currentPage * 10 - 9, numbersOfProperties);
  const maxNumber = Math.min(currentPage * 10, numbersOfProperties);

  const pageInfo = document.querySelector(
    ".page-info-container p",
  ) as HTMLParagraphElement;
  pageInfo.textContent = `${minNumber} - ${maxNumber} of ${numbersOfProperties}`;

  const page = document.querySelector("#page-nr") as HTMLParagraphElement;
  page.textContent = `${currentPage}`;
}
