import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";
import CommentsActionMessage from "../comments-action-message";
import CommentsActionForm from "../comments-action-form";

function CommentsAction({
  onComment,
  onActionClose,
  isRoot,
  session,
  innerActionId,
}) {
  const callbacks = {
    onSubmit: useCallback((commentText) => {
      onComment(commentText);
      onActionClose();
    }, []),

    onClose: useCallback((e) => {
      onActionClose();
    }, []),
  };

  return (
    <div className={isRoot ? "CommentsAction-root" : "CommentsAction"}>
      {!session.exists && (
        <CommentsActionMessage
          isRoot={isRoot}
          onClose={callbacks.onClose}
          innerActionId={innerActionId}
        />
      )}
      {session.exists && (
        <CommentsActionForm
          onSubmit={callbacks.onSubmit}
          onClose={callbacks.onClose}
          isRoot={isRoot}
          innerActionId={innerActionId}
        />
      )}
    </div>
  );
}

CommentsAction.propTypes = {
  session: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  onComment: PropTypes.func.isRequired,
  onActionClose: PropTypes.func.isRequired,
  innerActionId: PropTypes.string,
};

CommentsAction.defaultProps = {};

export default memo(CommentsAction);
