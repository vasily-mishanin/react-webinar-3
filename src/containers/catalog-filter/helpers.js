
/**
 * Получает массив объектов категорий и возвращает массив древовидных структур
 * @param {Array} categories
 * @returns
 */
export function convertToTree(categories) {
  const categoryMap = new Map();

  categories.forEach((category) => {
    categoryMap.set(category._id, { ...category, children: [] });
  });

  const treesArr = [];
  categoryMap.forEach((category) => {
    if (category.parent) {
      categoryMap.get(category.parent._id).children.push(category);
    } else {
      treesArr.push(category);
    }
  });

  return treesArr;
}

/**
 * Получает массив древовидных структур.
 * Возвращает плоский массив опций по-по порядку с добавлением необходимого количества "-" по вложенности
 * @param {Array} categoriesTreesArray
 * @returns {Array} Array of options {title, id}
 */

export function getOptions(categoriesTreesArray) {
  const getNested = (tree, options = [], nesting = '') => {
    const category = { title: nesting + tree.title, id: tree._id };

    if (tree.children.length > 0) {
      for (const child of tree.children) {
        options.push(getNested(child, [], '-' + nesting));
      }
      return [category, ...options];
    } else {
      return [category];
    }
  };

  let options = [];
  for (let tree of categoriesTreesArray) {
    options.push(getNested(tree));
  }

  while (options.some((option) => Array.isArray(option))) {
    options = options.flat();
  }

  return options;
}