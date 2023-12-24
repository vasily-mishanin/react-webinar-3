import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function CommentsActionMessage({ onClose, isRoot }) {
  const callbacks = {
    onClose: useCallback((e) => {
      onClose();
    }, []),
  };

  return (
    <div>
      <Link className="CommentsActionMessage-link-authorize" to="/login">
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
};

CommentsActionMessage.defaultProps = {
  onActionClose: () => {},
};

export default memo(CommentsActionMessage);
