import StoreModule from "../module";
const HEADERS = { "Accept-Language": "ru-RU" };

/**
 * Состояние списка категорий
 */
class CategoryState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  /**
   * Установка параметров и загрузка списка категорий
   * @returns {Promise<void>}
   */
  async load() {
    try {
      // Сброс категорий и установка признака ожидания загрузки
      this.setState({
        categories: [],
        waiting: true,
      });

      const categories_data = await (
        await fetch("/api/v1/categories?fields=_id,title,parent(_id)&limit=*", {
          headers: HEADERS,
        })
      ).json();

      this.setState(
        {
          ...this.getState(),
          categories: categories_data.result.items,
          waiting: false,
        },
        "Загружен список категорий из АПИ"
      );
    } catch (error) {
      console.log("Error loading categoires", error);
    }
  }
}

export default CategoryState;
