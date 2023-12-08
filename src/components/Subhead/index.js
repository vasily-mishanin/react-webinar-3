import { memo } from "react";
import Navigation from "../navigation/navigation";
import BasketTool from "../basket-tool";

import "./style.css";

function Subhead(props) {
  return (
    <div className="Subhead">
      <Navigation />
      <BasketTool
        onOpen={props.openModalBasket}
        amount={props.amount}
        sum={props.sum}
      />
    </div>
  );
}
export default memo(Subhead);
