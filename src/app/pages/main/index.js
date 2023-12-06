import { memo, useCallback, useState, useEffect } from "react";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import BasketTool from "../../../components/basket-tool";
import Basket from "../../basket";
import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";
import { Outlet, useParams } from "react-router-dom";
import Navigation from "../../../components/navigation/navigation";

import "./style.css";

function Main() {
  const store = useStore();
  const activeModal = useSelector((state) => state.modals.name);
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );

  const [title, setTitle] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    if (!productId) {
      setTitle(null);
    }
  }, [productId]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head
          title={productId && title ? title : dictionary[currentLanguage].shop}
        />
        <div className="Subhead">
          <Navigation />
          <BasketTool
            onOpen={callbacks.openModalBasket}
            amount={select.amount}
            sum={select.sum}
          />
        </div>
        <Outlet context={[title, setTitle]} />
      </PageLayout>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default memo(Main);
