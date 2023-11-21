/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = { list: [] }) {
    this.state = initState;
    this.nextKey = this.state?.list?.length + 1 ?? 1;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: this.nextKey++, title: 'Новая запись' },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const prevSelectedItem =
      this.state.list.find((item) => item.selected) ?? null;
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        // клик на выделенном элементе
        if (item.code === code && item.code === prevSelectedItem?.code) {
          item.selected = !item.selected;
          return item;
        }
        // клик на другом элементе
        if (item.code === code && item.code !== prevSelectedItem?.code) {
          item.selected = true;
          item.selectedCount = item.selectedCount ? item.selectedCount + 1 : 1;
        }
        // клик на другом элементе - снять выделение с прошлого
        if (item.code === prevSelectedItem?.code) {
          item.selected = false;
        }

        return item;
      }),
    });
  }
}

export default Store;
