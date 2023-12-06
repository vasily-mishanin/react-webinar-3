import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      totalCount: 0,
    };
  }

  async load(query = "") {
    const url = "/api/v1/articles" + "/" + query;
    const response = await fetch(url, { headers: { "Accept-Language": "ru" } });
    const data = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: data.result.items,
        totalCount: data.result.count,
      },
      "Загружены товары из АПИ"
    );
  }
}

export default Catalog;
