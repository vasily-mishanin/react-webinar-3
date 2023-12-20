import { memo, useCallback } from "react";

import { useSelector } from "react-redux";
import useSelectorCustom from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsAction from "../../components/comments-action";
import { commentsToTreesArray } from "../../utils/list-to-tree";
import { useParams } from "react-router-dom";
import CommentTree from "../../components/comment-tree";

function Comments() {
  const params = useParams();
  const select = useSelector((state) => ({
    comments: state.article.comments,
    waiting: state.article.waiting,
  }));

  const session = useSelectorCustom((state) => ({
    exists: state.session.exists,
    errors: state.session.errors,
  }));

  const callbacks = {
    onComment: useCallback((comment) => {
      console.log(comment);
    }, []),
  };

  const processedComments = commentsToTreesArray(select.comments, params.id);

  return (
    <Spinner active={select.waiting}>
      <h2>Комментарии ({select.comments.length})</h2>
      {/* //comments tree */}
      {processedComments.map((comment) => {
        const { children, ...commentDetails } = comment;
        return (
          <CommentTree
            key={comment._id}
            comment={commentDetails}
            childComments={children}
            session={session}
            onComment={callbacks.onComment}
          />
        );
      })}
      <CommentsAction
        onComment={callbacks.onComment}
        isNewComment={true}
        session={session}
      />
    </Spinner>
  );
}

export default memo(Comments);
