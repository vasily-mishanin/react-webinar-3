import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "./style.css";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="Modal-background" onClick={onClose}>
      <div
        className="Modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
};

export default React.memo(Modal);
