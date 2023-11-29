import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, withContol = false, onControlClick }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {withContol && (
        <div className="Head-controls">
          <button onClick={() => onControlClick()}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  withContol: PropTypes.bool,
  onControlClick: PropTypes.func,
};

export default React.memo(Head);
