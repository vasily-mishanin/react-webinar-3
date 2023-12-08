import { memo, useCallback, useEffect } from "react";

import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";

import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import Subhead from "../../../components/Subhead";
import List from "../../../components/list";
import Pagination from "../../../components/pagination";
import Item from "../../../components/item";

function Main() {
  const store = useStore();
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );

  const select = useSelector((state) => ({
    list: state.catalog.list,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load("?fields=items(_id,%20title,%20price),count");
  }, []);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
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
      <PageLayout>
        <Head title={dictionary[currentLanguage].shop} />
        <Subhead
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <List list={select.list} renderItem={renders.item} />
        <Pagination count={select.totalCount} length={10} />
      </PageLayout>
    </>
  );
}

export default memo(Main);
