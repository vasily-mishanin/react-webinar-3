import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Wrapper({ top, right, bottom, left, children }) {
  const wrapperStyle = {
    margin: `${top}px ${right}px ${bottom}px ${left}px`,
    paddingBottom: `${bottom}px`,
  };

  return (
    <section className="CommentsWrapper" style={wrapperStyle}>
      {children}
    </section>
  );
}

Wrapper.propTypes = {
  top: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number,
  left: PropTypes.number,
  children: PropTypes.node,
};

Wrapper.defaultProps = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export default memo(Wrapper);
