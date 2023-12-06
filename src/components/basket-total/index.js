import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";
import useSelector from "../../store/use-selector";
const cn = bem("BasketTotal");

function BasketTotal({ sum }) {
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );
  const d = dictionary[currentLanguage];

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
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
