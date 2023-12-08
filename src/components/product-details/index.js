import { memo } from "react";
import PropTypes from "prop-types";

import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";

import "./style.css";

const cn = bem("Product");

function ProductDetails(props) {
  const { product, d } = props;

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
      <button onClick={props.addToBasket}>{d.add}</button>
    </article>
  );
}

ProductDetails.propTypes = {
  addToBasket: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

ProductDetails.defaultProps = {
  addToBasket: () => {},
  product: null,
};

export default memo(ProductDetails);
