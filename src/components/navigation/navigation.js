import { Link } from "react-router-dom";
import { memo } from "react";
import useSelector from "../../store/use-selector";

import "./style.css";

function Navigation() {
  const { currentLanguage, dictionary } = useSelector(
    (state) => state.translate
  );

  return (
    <nav className="Navigation">
      <Link to="/">{dictionary[currentLanguage].main}</Link>
    </nav>
  );
}

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default memo(Navigation);
