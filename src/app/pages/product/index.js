import { memo, useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import useStore from "../../../store/use-store";
import useSelector from "../../../store/use-selector";

import ProductDetails from "../../../components/product-details";
import PageLayout from "../../../components/page-layout";
import Head from "../../../components/head";
import Subhead from "../../../components/Subhead";

import "./style.css";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { productId } = useParams();
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );
  const d = dictionary[currentLanguage];

  const store = useStore();
  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    (async () => {
      const url = `/api/v1/articles/${productId}/?fields=*,madeIn(title,code),category(title)`;
      setIsLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(url, {
          headers: { "Accept-Language": "ru" },
        });

        if (response.status === 404) {
          setIsLoading(false);
          setNotFound(true);
        }

        const data = await response.json();
        setIsLoading(false);
        setProduct(data.result);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [productId]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => {
      store.actions.basket.addToBasket(productId);
    }, [store, productId]),

    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
  };

  return (
    <>
      <PageLayout>
        <Head title={product?.title || ""} />
        <Subhead
          openModalBasket={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        {isLoading && <p className="ProductPage-message">⏳ ...</p>}
        {notFound && (
          <p className="ProductPage-message">
            💁‍♂️ Такой продукт не найден, проверьте адрес запрашиваемого ресурса
          </p>
        )}
        {product ? (
          <ProductDetails
            product={product}
            addToBasket={callbacks.addToBasket}
            d={d}
          />
        ) : null}
      </PageLayout>
    </>
  );
}

export default memo(ProductPage);
