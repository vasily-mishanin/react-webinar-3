import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";
import List from "../list";

function Cart({ onClose, cartItems, onRemoveItemFromCart }) {
  return (
    <div className="Cart">
      <Head title="Корзина" withContol onControlClick={onClose} />
      <List list={cartItems.items} isCartList onAction={onRemoveItemFromCart} />
      <p className="Cart-total">
        <span>Итого </span>
        <span>{cartItems.totalPrice} ₽</span>
      </p>
    </div>
  );
}

Cart.propTypes = {
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.object,
  onRemoveItemFromCart: PropTypes.func,
};

Cart.defaultProps = {
  onClose: () => {},
  cartItems: {},
  onRemoveItemFromCart: () => {},
};

export default React.memo(Cart);
