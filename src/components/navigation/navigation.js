import { Link } from "react-router-dom";
import { memo } from "react";

import "./style.css";

function Navigation() {
  return (
    <nav className="Navigation">
      <Link to="/">Главная</Link>
    </nav>
  );
}

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default memo(Navigation);
