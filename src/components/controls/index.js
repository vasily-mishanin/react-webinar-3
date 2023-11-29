import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { plural } from "../../utils";

const pluralVariants = {
  one: "товар",
  few: "товарa",
  many: "товаров",
};

function Controls({ cartSummary, onOpenCart }) {
  const summary = cartSummary
    ? `${cartSummary.amount} ${plural(
        cartSummary.amount,
        pluralVariants,
        "ru-RU"
      )} / ${cartSummary.totalPrice} ₽
  `
    : "пусто";

  return (
    <div className="Controls">
      <div className="Controls-info">
        В корзине: <span>{summary}</span>
      </div>
      <button onClick={() => onOpenCart(true)}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  cartSummary: PropTypes.object,
  onOpenCart: PropTypes.func,
};

Controls.defaultProps = {
  cartSummary: {},
  onOpenCart: () => {},
};

export default React.memo(Controls);
