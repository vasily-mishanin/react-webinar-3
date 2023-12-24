import { memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
const cn = bem("Comment");
import { dateToReadableString } from "../../utils/date-to-readable-string";
import CommentsAction from "../comments-action";

const MAX_DEPTH = 7;

function CommentTree({
  comment,
  childComments,
  session,
  isRoot,
  onComment,
  onActionActive,
  innerActionId,
  depth,
}) {
  const callbacks = {
    onAnswer: useCallback(() => {
      onActionActive(comment._id);
    }, [comment]),

    onActionClose: useCallback(() => {
      onActionActive("ROOT");
    }, []),

    onComment: useCallback((text) => {
      const answerComment = {
        text,
        parent: {
          _id: comment._id,
          _type: "comment",
        },
        author: {
          profile: {
            name: session.user.profile.name,
          },
          _id: session.user._id,
        },
      };

      onComment(answerComment);
    }, []),
  };

  const usernameStyle =
    session.exists && comment.author.profile.name === session.user.profile.name
      ? cn("username-me")
      : cn("username");

  return (
    <div
      className={
        isRoot || depth > MAX_DEPTH ? "CommentTree-root" : "CommentTree"
      }
    >
      <article className={cn()}>
        <div className={cn("header")}>
          <span className={usernameStyle}>{comment.author.profile.name}</span>
          <span className={cn("time")}>
            {dateToReadableString(comment.dateCreate)}
          </span>
        </div>
        <p className={cn("text")}>{comment.text}</p>
        <button className={cn("btn-comment")} onClick={callbacks.onAnswer}>
          Ответить
        </button>
      </article>

      {childComments.map((childComment) => {
        const { children, ...comment } = childComment;
        return (
          <CommentTree
            key={comment._id}
            comment={comment}
            childComments={children}
            session={session}
            isRoot={false}
            onComment={onComment}
            onActionActive={onActionActive}
            innerActionId={innerActionId}
            depth={depth + 1}
          />
        );
      })}

      {innerActionId === comment._id && (
        <CommentsAction
          onComment={callbacks.onComment}
          onActionClose={callbacks.onActionClose}
          isRoot={false}
          session={session}
        />
      )}
    </div>
  );
}

CommentTree.propTypes = {
  comment: PropTypes.object.isRequired,
  childComments: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  isRoot: PropTypes.bool.isRequired,
  onComment: PropTypes.func.isRequired,
  onActionActive: PropTypes.func.isRequired,
  innerActionId: PropTypes.string.isRequired,
  depth: PropTypes.number,
};

CommentTree.defaultProps = {
  depth: 0,
};

export default memo(CommentTree);
