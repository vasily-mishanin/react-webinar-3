import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import List from "../list";
import { formatPrice } from "../../utils";
import ItemCart from "../item-cart";

function Cart({ onClose, cartInfo, onRemoveItemFromCart }) {
  return (
    <div className="Cart">
      <Head title="Корзина" withContol onControlClick={onClose} />
      <List
        list={cartInfo.items}
        resourceName="item"
        ItemComponent={ItemCart}
        onAction={onRemoveItemFromCart}
      />
      <p className="Cart-total">
        <span>Итого </span>
        <span>{formatPrice(cartInfo.totalPrice, "ru-RU", "RUB")}</span>
      </p>
    </div>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func.isRequired,
  cartInfo: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        count: PropTypes.number,
        price: PropTypes.number,
        amount: PropTypes.number,
      })
    ),
    totalPrice: PropTypes.number,
  }).isRequired,
  onRemoveItemFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onClose: () => {},
  cartInfo: {},
  onRemoveItemFromCart: () => {},
};

export default React.memo(Cart);
