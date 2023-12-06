import Item from "../../components/item";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import { memo, useCallback, useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Products() {
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load("?fields=items(_id,%20title,%20price),count");
  }, []);

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalCount: state.catalog.totalCount,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <>
      <List list={select.list} renderItem={renders.item} />
      <Pagination count={select.totalCount} length={10} />
    </>
  );
}
export default memo(Products);
