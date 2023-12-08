import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import useSelector from "../../store/use-selector";
import "./style.css";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");

  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );
  const d = dictionary[currentLanguage];

  return (
    <div className={cn()}>
      <span className={cn("label")}>{d.in_basket}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: d.product_one,
              few: d.product_few,
              many: d.product_many,
            })} / ${numberFormat(sum)} ₽`
          : d.empty}
      </span>
      <button onClick={onOpen}>{d.open}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
