import { memo, useEffect, useCallback, useState } from "react";

import { useOutletContext, useParams } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import useStore from "../../store/use-store";
import { numberFormat } from "../../utils";
import "./style.css";

const cn = bem("Product");

function ProductDetails() {
  const [title, setTitle] = useOutletContext();
  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();

  const store = useStore();

  useEffect(() => {
    (async () => {
      const url = `/api/v1/articles/${productId}/?fields=*,madeIn(title,code),category(title)`;
      setIsLoading(true);
      setNotFound(false);
      const response = await fetch(url, {
        headers: { "Accept-Language": "ru" },
      });

      if (response.status === 404) {
        setNotFound(true);
      }

      const data = await response.json();
      setIsLoading(false);
      setProduct(data.result);
      setTitle(data.result.title);
    })();
  }, [productId]);

  const callbacks = {
    addToBasket: useCallback(
      () => store.actions.basket.addToBasket(productId),
      [store, productId]
    ),
  };

  if (isLoading) {
    return <p className={cn()}>⏳...</p>;
  }

  if (notFound) {
    return (
      <p className={cn()}>Такой продукт не найден, проверьте id продукта</p>
    );
  }

  if (!product) return null;

  const price = numberFormat(product.price, "ru-RU", {
    style: "currency",
    currency: "RUB",
  });

  return (
    <article className={cn()}>
      <p className={cn("description")}>{product.description}</p>
      <p className={cn("country")}>
        Страна производитель: <span>{product.madeIn.title}</span>
      </p>
      <p className={cn("category")}>
        Категория: <span>{product.category.title}</span>
      </p>
      <p className={cn("year")}>
        Год выпуска: <span>{new Date(product.dateCreate).getFullYear()}</span>
      </p>
      <p className={cn("price")}>
        Цена: <span>{price}</span>
      </p>
      <button onClick={callbacks.addToBasket}>Добавить</button>
    </article>
  );
}

export default memo(ProductDetails);
