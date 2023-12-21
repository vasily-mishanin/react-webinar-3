/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = "_id") {
  let trees = {};
  let roots = {};
  for (const item of list) {
    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent?.[key]) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent[key]]) {
        trees[item.parent[key]] = { children: [] };
        roots[item.parent[key]] = trees[item.parent[key]];
      }
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[item[key]]) delete roots[item[key]];
    }
  }
  return Object.values(roots);
}

/**
 * Получает массив объектов комментариев и идентификатор товара
 * Возвращает массив корневых комментов в виде деревьев
 * @param comments {Array} Список комментов с отношением на родителя
 * @param [articleId] {String} Свойство с первичным ключом корневого коммента
 * @returns {Array} Корневые узлы с деревом потомков
 */
export function commentsToTreesArray(comments, articleId) {
  const commentsMap = new Map();
  comments.forEach((comment) => {
    commentsMap.set(comment._id, { ...comment, children: [] });
  });

  // объекты в этом массиве ссылаются на объекты в мапе commentsMap
  const commentsTreesArray = [];

  commentsMap.forEach((comment) => {
    if (
      comment.parent._id === articleId ||
      comment.parent._type === "article"
    ) {
      commentsTreesArray.push(comment);
    } else {
      commentsMap.get(comment.parent._id).children.push(comment);
    }
  });

  return commentsTreesArray;
}
