import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, withContol = false, onClick }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {withContol && (
        <div className="Head-controls">
          <button onClick={() => onClick()}>Закрыть</button>
        </div>
      )}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
