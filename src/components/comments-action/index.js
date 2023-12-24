import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

function CommentsAction({ onComment, onActionClose, isRoot, session }) {
  const [commentText, setCommentText] = useState("");
  const processText = (text) => text.trim().replace(/[ \t]{2,}/gi, " ");
  const isCommentTextValid = (text) => processText(text).length > 0;

  const cn = bem("CommentForm");

  const callbacks = {
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        onComment(processText(commentText));
        onActionClose();
      },
      [commentText]
    ),

    onClose: useCallback((e) => {
      onActionClose();
    }, []),
  };

  return (
    <div className={isRoot ? "CommentsAction-root" : "CommentsAction"}>
      {!session.exists && (
        <div>
          <Link to="/login">Войдите</Link>
          <span>
            , чтобы иметь возможность
            {isRoot ? " комментировать." : " ответить."}
          </span>
          {!isRoot && (
            <button
              className="CommentsAction-btn-cancel"
              onClick={callbacks.onClose}
            >
              Отмена
            </button>
          )}
        </div>
      )}
      {session.exists && (
        <form className={cn()} onSubmit={callbacks.onSubmit}>
          <div className={cn("input")}>
            <label htmlFor="commentText">
              Новый {isRoot ? "комментарий" : "ответ"}
            </label>
            <textarea
              value={commentText}
              id="commentText"
              rows="5"
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
          </div>
          <div className={cn("actions")}>
            <button
              className={cn("btn-send")}
              type="submit"
              disabled={!isCommentTextValid(commentText)}
            >
              Отправить
            </button>
            {!isRoot && (
              <button
                className={cn("btn-cancel")}
                type="button"
                onClick={onActionClose}
              >
                Отмена
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

CommentsAction.propTypes = {
  onComment: PropTypes.func.isRequired,
  isRoot: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

CommentsAction.defaultProps = {
  onClose: () => {},
};

export default memo(CommentsAction);
