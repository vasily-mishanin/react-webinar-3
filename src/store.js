import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
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
        { code: generateCode(), title: "Новая запись" },
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
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }

  /**
   * Добавление товара в корзину
   * @param productId {number}
   */

  addItemToCart(productId) {
    const newCart = new Map(this.state.cart);
    newCart.set(
      productId,
      newCart.get(productId) ? newCart.get(productId) + 1 : 1
    );
    this.setState({ ...this.state, cart: newCart });
  }

  /**
   * Удаление продукта из корзины
   * @param productId {number}
   */
  removeItemFromCart(productId) {
    const newCart = new Map(this.state.cart);
    newCart.delete(productId);
    this.setState({ ...this.state, cart: newCart });
  }

  /**
   * Получить общие данные о корзине
   */
  getCartSummary() {
    if (!this.state.cart?.size) {
      return null;
    }

    let totalPrice = 0;

    for (const [productId, count] of this.state.cart) {
      const product = this.state.list.find((item) => item.code === productId);
      totalPrice += product ? product.price * count : 0;
    }

    return { amount: this.state.cart.size, totalPrice };
  }

  /**
   * Получить подробные данные о корзине
   */
  getCartInfo() {
    if (!this.state.cart?.size) {
      return { items: [], totalPrice: 0 };
    }

    let totalPrice = 0;
    const items = [];

    for (const [productId, count] of this.state.cart) {
      const product = this.state.list.find((item) => item.code === productId);
      if (product) {
        totalPrice += product ? product.price * count : 0;
        items.push({ ...product, amount: count });
      }
    }

    return { items, totalPrice };
  }
}

export default Store;
