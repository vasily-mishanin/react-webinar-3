import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function CommentsActionMessage({ onClose, isRoot, innerActionId }) {
  const callbacks = {
    onClose: useCallback((e) => {
      onClose();
    }, []),
  };

  const location = useLocation();

  return (
    <div id={innerActionId}>
      <Link
        className="CommentsActionMessage-link-authorize"
        to={"/login"}
        state={{ back: location.pathname }}
      >
        Войдите
      </Link>
      <span>
        , чтобы иметь возможность
        {isRoot ? " комментировать." : " ответить."}
      </span>
      {!isRoot && (
        <button
          className="CommentsActionMessage-btn-cancel"
          onClick={callbacks.onClose}
        >
          Отмена
        </button>
      )}
    </div>
  );
}

CommentsActionMessage.propTypes = {
  onActionClose: PropTypes.func.isRequired,
  isRoot: PropTypes.bool.isRequired,
  innerActionId: PropTypes.string,
};

CommentsActionMessage.defaultProps = {
  onActionClose: () => {},
};

export default memo(CommentsActionMessage);
