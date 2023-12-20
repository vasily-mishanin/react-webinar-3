import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
const cn = bem("Comment");
import { dateToReadableString } from "../../utils/date-to-readable-string";
import CommentsAction from "../comments-action";

function CommentTree({ comment, childComments, session, onComment }) {
  const [active, setActive] = useState(false);

  const callbacks = {
    onAnswer: useCallback(() => {
      setActive(true);
    }, []),
    onClose: useCallback(() => {
      setActive(false);
    }, []),
  };

  console.log("Session", session);

  return (
    <div className="CommentTree">
      <article className={cn()}>
        <div className={cn("header")}>
          <span className={cn("username")}>{comment.author.profile.name}</span>
          <span className={cn("time")}>
            {dateToReadableString(comment.dateCreate)}
          </span>
        </div>
        <p className={cn("text")}>{comment.text}</p>
        <button className={cn("btn-comment")} onClick={callbacks.onAnswer}>
          Ответить
        </button>
      </article>

      {active && (
        <CommentsAction
          onComment={onComment}
          onClose={callbacks.onClose}
          isNewComment={false}
          session={session}
        />
      )}

      {childComments.map((item) => {
        const { children, ...comment } = item;
        return (
          <CommentTree
            key={comment._id}
            comment={comment}
            childComments={children}
            session={session}
            onComment={onComment}
          />
        );
      })}
    </div>
  );
}

CommentTree.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
  children: PropTypes.node,
};

CommentTree.defaultProps = {};

export default memo(CommentTree);
