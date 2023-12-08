import { memo, useCallback } from "react";
import propTypes from "prop-types";
import { numberFormat } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./style.css";
const cn = bem("ItemBasket");

function ItemBasket(props) {
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link
        to={props.link}
        className={cn("title")}
        onClick={props.onTitleClick}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {props.d.item}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{props.d.remove}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
};

export default memo(ItemBasket);
