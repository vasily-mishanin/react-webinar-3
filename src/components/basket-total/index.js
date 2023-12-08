import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
const cn = bem("BasketTotal");

function BasketTotal({ sum, d }) {
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{d.total}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  d: PropTypes.object,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
