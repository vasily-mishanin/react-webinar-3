import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import "./style.css";

function Head({ title, currentLanguage }) {
  const store = useStore();

  const handleSelect = useCallback(
    (e) => {
      store.actions.translate.changeLanguage(e.target.value);
    },
    [store]
  );

  return (
    <div className="Head">
      <h1>{title}</h1>
      <select
        name="language"
        id="language-select"
        defaultValue={currentLanguage}
        onChange={handleSelect}
      >
        <option value="RU">RU</option>
        <option value="EN">EN</option>
      </select>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  d: PropTypes.object,
};

export default memo(Head);
