import { memo } from "react";
import PropTypes from "prop-types";

import Navigation from "../navigation/navigation";
import BasketTool from "../basket-tool";

import "./style.css";

function Subhead(props) {
  return (
    <div className="Subhead">
      <Navigation d={props.d} />
      <BasketTool
        onOpen={props.openModalBasket}
        amount={props.amount}
        sum={props.sum}
        d={props.d}
      />
    </div>
  );
}

Subhead.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  d: PropTypes.object,
};

Subhead.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(Subhead);
