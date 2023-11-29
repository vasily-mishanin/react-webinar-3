import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, isCartList, onAction }) {
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
  isCartList: PropTypes.bool,
  onAction: PropTypes.func,
};

List.defaultProps = {
  onAction: () => {},
};

export default React.memo(List);
