import { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import articleActions from "../../store-redux/article/actions";
import useSelectorCustom from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsAction from "../../components/comments-action";
import { commentsToTreesArray } from "../../utils/list-to-tree";
import { useParams } from "react-router-dom";
import CommentTree from "../../components/comment-tree";
import Wrapper from "../../components/wrapper";
import Heading2 from "../../components/heading-2";

function Comments() {
  const [innerActionId, setInnerActionId] = useState("ROOT_ACTION");
  const dispatch = useDispatch();

  const params = useParams();
  const select = useSelector((state) => ({
    article: state.article.data,
    comments: state.article.comments,
    waiting: state.article.waiting,
  }));

  const session = useSelectorCustom((state) => state.session);

  const callbacks = {
    onComment: useCallback((answerComment) => {
      dispatch(articleActions.createComment(answerComment));
      setInnerActionId("ROOT_ACTION");
    }, []),

    onRootComment: useCallback((text) => {
      const newRootComment = {
        text,
        parent: {
          _id: select.article._id,
          _type: "article",
        },
        author: {
          profile: {
            name: session.user.profile.name,
          },
          _id: session.user._id,
        },
      };
      dispatch(articleActions.createComment(newRootComment));
    }, []),

    onActionActive: useCallback((actionId) => {
      setInnerActionId(actionId);
    }, []),

    onActionClose: useCallback((actionId) => {
      setInnerActionId("ROOT_ACTION");
    }, []),
  };

  const processedComments = commentsToTreesArray(
    select.comments,
    params.id
  ).map((comment) => {
    const { children, ...commentDetails } = comment;
    return { children, commentDetails };
  });

  useEffect(() => {
    if (innerActionId === "ROOT_ACTION") {
      return;
    }

    const element = document.getElementById(innerActionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [innerActionId]);

  return (
    <Spinner active={select.waiting}>
      <Wrapper top={30} right={40} bottom={30} left={40}>
        <Heading2>Комментарии ({select.comments.length})</Heading2>
        {processedComments.map((comment) => (
          <CommentTree
            key={comment.commentDetails._id}
            comment={comment.commentDetails}
            childComments={comment.children}
            session={session}
            isRoot={true}
            onComment={callbacks.onComment}
            onActionActive={callbacks.onActionActive}
            innerActionId={innerActionId}
          />
        ))}
        {innerActionId === "ROOT_ACTION" && (
          <CommentsAction
            isRoot={true}
            session={session}
            onComment={callbacks.onRootComment}
            onActionClose={callbacks.onActionClose}
            innerActionId={innerActionId}
          />
        )}
      </Wrapper>
    </Spinner>
  );
}

export default memo(Comments);
