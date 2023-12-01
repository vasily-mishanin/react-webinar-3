import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function List({ list, resourceName, ItemComponent, onAction }) {
  return (
    <ul className="List">
      {list.map((item) => (
        <li key={item.code} className="List-item">
          <ItemComponent {...{ [resourceName]: item }} onAction={onAction} />
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
  resourceName: PropTypes.string.isRequired,
  ItemComponent: PropTypes.elementType,
  onAction: PropTypes.func,
};

List.defaultProps = {
  onAction: () => {},
};

export default React.memo(List);
