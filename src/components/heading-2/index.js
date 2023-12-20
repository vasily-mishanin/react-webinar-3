import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Heading2({ children }) {
  return <h2 className="Heading2">{children}</h2>;
}

Heading2.propTypes = {
  children: PropTypes.node,
};

export default memo(Heading2);
