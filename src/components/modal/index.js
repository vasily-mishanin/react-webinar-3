import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "./style.css";
import Head from "../head";
import List from "../list";

function Modal({ onClose, cartItems, onRemoveItemFromCart }) {
  console.log({ cartItems });
  return createPortal(
    <div className="Modal-background" onClick={onClose}>
      <div
        className="Modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Head title="Корзина" withContol onClick={onClose} />
        <List
          list={cartItems.items}
          isCartList
          onAction={onRemoveItemFromCart}
        />
        <p className="Modal-total">
          <span>Итого </span>
          <span>{cartItems.totalPrice} ₽</span>
        </p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default React.memo(Modal);
