/**
 * Возвращает массив элементов для рендеринга кнопок пагинации
 * @param {Object} options
 * @returns {Array}
 */

export function getPagination(options) {
  const { length, totalCount, currentPage } = options;
  console.log(options);

  const numberOfpages = Math.ceil(totalCount / length);

  if (currentPage > numberOfpages || currentPage < 1) {
    throw Error("Wrong current page", currentPage);
  }

  if (numberOfpages < 7) {
    return Array.from({ length: numberOfpages }, (_, i) => i + 1);
  }

  if (currentPage < 3) {
    return [1, 2, 3, "...", numberOfpages];
  }

  if (currentPage === 3) {
    return [1, 2, 3, 4, "...", numberOfpages];
  }

  if (currentPage > numberOfpages - 2) {
    return [1, "...", numberOfpages - 2, numberOfpages - 1, numberOfpages];
  }

  if (currentPage === numberOfpages - 2) {
    return [
      1,
      "...",
      numberOfpages - 3,
      numberOfpages - 2,
      numberOfpages - 1,
      numberOfpages,
    ];
  }

  console.log({ currentPage });

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    numberOfpages,
  ];
}
