import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";
import "./style.css";

function Item(props) {
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );
  const d = dictionary[currentLanguage];

  const cn = bem("Item");

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <Link to={props.link} className={cn("title")}>
        {props.item.title}
      </Link>
      <div className={cn("actions")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{d.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  link: PropTypes.string,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default memo(Item);
