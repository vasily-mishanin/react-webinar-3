import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function CommentsActionForm({ isRoot, onSubmit, onClose }) {
  const [commentText, setCommentText] = useState("");
  const processText = (text) => text.trim().replace(/[ \t]{2,}/gi, " ");
  const isCommentTextValid = (text) => processText(text).length > 0;

  const cn = bem("CommentsActionForm");

  const callbacks = {
    onSubmit: useCallback(
      (e) => {
        e.preventDefault();
        onSubmit(processText(commentText));
        onClose();
      },
      [commentText]
    ),

    onClose: useCallback((e) => {
      onClose();
    }, []),
  };

  return (
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
            onClick={callbacks.onClose}
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

CommentsActionForm.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

CommentsActionForm.defaultProps = {};

export default memo(CommentsActionForm);
