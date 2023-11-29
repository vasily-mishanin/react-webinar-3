import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onAction, isCartList }) {
  return (
    <ul className="List">
      {list.map((item) => (
        <li key={item.code} className="List-item">
          <Item item={item} onAction={onAction} isCartItem={isCartList} />
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
