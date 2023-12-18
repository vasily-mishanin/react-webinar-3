import { memo } from "react";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

function AuthHeader(props) {
  const callbacks = {
    logOut: useCallback(() => {
      props.logOut();
    }, []),
  };

  return (
    <div className="AuthHeader">
      {props.user.token && (
        <>
          <Link className="AuthHeader-link" to="/profile">
            {props.user.name}
          </Link>
          <button className="AuthHeader-button" onClick={callbacks.logOut}>
            {props.t("auth.logout")}
          </button>
        </>
      )}
      {!props.user.token && (
        <Link className="AuthHeader-button" to="/login">
          {props.t("auth.enter")}
        </Link>
      )}
    </div>
  );
}

export default memo(AuthHeader);

AuthHeader.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  t: PropTypes.func,
};

AuthHeader.defaultProps = {
  user: null,
  t: (text) => text,
};
