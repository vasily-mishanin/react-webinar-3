import { memo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";

function CommentsAction({ onComment, onClose, isNewComment, session }) {
  const textRef = useRef(null);
  const cn = bem("CommentForm");

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault();
      onComment(textRef.current.value);
      onClose();
    }, []),
  };

  return (
    <div className="CommentsAction">
      {!session.exists && (
        <div>
          <Link to="/login">Войдите</Link>
          <span>
            , чтобы иметь возможность
            {isNewComment ? " комментировать." : " ответить."}
          </span>
          {!isNewComment && (
            <button className="CommentsAction-btn-cancel" onClick={onClose}>
              Отмена
            </button>
          )}
        </div>
      )}
      {session.exists && (
        <form className={cn()} onSubmit={callbacks.onSubmit}>
          <div className={cn("input")}>
            <label htmlFor="commentText">Новый комментарий</label>
            <textarea ref={textRef} id="commentText" rows="5"></textarea>
          </div>
          <div className={cn("actions")}>
            <button className={cn("btn-send")} type="submit">
              Отправить
            </button>
            {!isNewComment && (
              <button
                className={cn("btn-cancel")}
                type="button"
                onClick={onClose}
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
  isNewComment: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired,
};

export default memo(CommentsAction);
