import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const cn = bem("Item");

function ItemCart(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      <span className={cn("code")}>{props.item.code}</span>
      <span className={cn("title")}>{props.item.title}</span>
      <span className={cn("price")}>
        {formatPrice(props.item.price, "ru-RU", "RUB")}
      </span>
      <span className={cn("amount")}>{props.item.amount} шт</span>
      <div className={cn("actions")}>
        <button onClick={callbacks.onAction}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
};

ItemCart.defaultProps = {
  onAction: () => {},
};

export default React.memo(ItemCart);
