import React, { useState } from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

const cn = bem("Item");

function Item(props) {
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
      <span className={cn("price")}>{props.item.price} ₽</span>
      {props.isCartItem && (
        <span className={cn("amount")}>{props.item.amount} шт</span>
      )}
      <div className={cn("actions")}>
        <button onClick={callbacks.onAction}>
          {props.isCartItem ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onAction: () => {},
};

export default React.memo(Item);
