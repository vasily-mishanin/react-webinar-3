import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Translate extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentLanguage: "RU",
      dictionary: {
        RU: {
          shop: "Магазин",
          main: "Главная",
          in_basket: "В корзине",
          empty: "пусто",
          open: "Перейти",
          add: "Добавить",
          remove: "Удалить",
          basket: "Корзина",
          close: "Закрыть",
          total: "Итого",
          item: "шт",
          product_one: "товар",
          product_few: "товара",
          product_many: "товаров",
        },
        EN: {
          shop: "Shop",
          main: "Main",
          in_basket: "In your basket",
          empty: "empty",
          open: "Open",
          add: "Add",
          remove: "Remove",
          basket: "Basket",
          close: "Close",
          total: "Total",
          item: "itm.",
          product_one: "product",
          product_few: "products",
          product_many: "products",
        },
      },
    };
  }

  changeLanguage(lang) {
    this.setState({ ...this.getState(), currentLanguage: lang }, "Смена языка");
  }
}

export default Translate;
