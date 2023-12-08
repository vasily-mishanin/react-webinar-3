import { Link } from "react-router-dom";
import { memo } from "react";
import PropTypes from "prop-types";

import "./style.css";

function Navigation(props) {
  return (
    <nav className="Navigation">
      <Link to="/">{props.d.main}</Link>
    </nav>
  );
}

Navigation.propTypes = {
  d: PropTypes.object,
};

Navigation.defaultProps = {};

export default memo(Navigation);
