import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useSelectorCustom from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import CommentsAction from "../../components/comments-action";
import { commentsToTreesArray } from "../../utils/list-to-tree";
import { useParams } from "react-router-dom";
import CommentTree from "../../components/comment-tree";
import Wrapper from "../../components/wrapper";
import Heading2 from "../../components/heading-2";

function Comments() {
  const [innerActionId, setInnerActionId] = useState("ROOT");

  const params = useParams();
  const select = useSelector((state) => ({
    article: state.article.data,
    comments: state.article.comments,
    waiting: state.article.waiting,
  }));

  const session = useSelectorCustom((state) => state.session);

  const callbacks = {
    onComment: useCallback((answerComment) => {
      console.log({ answerComment });
      //TODO - send POST request
      setInnerActionId("ROOT");
    }, []),

    onRootComment: useCallback((text) => {
      const newComment = {
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
      console.log(select.article);
      console.log(newComment);
      //TODO - send POST request
    }, []),

    onActionActive: useCallback((actionId) => {
      setInnerActionId(actionId);
    }, []),

    onActionClose: useCallback((actionId) => {
      setInnerActionId("ROOT");
    }, []),
  };

  const processedComments = commentsToTreesArray(
    select.comments,
    params.id
  ).map((comment) => {
    const { children, ...commentDetails } = comment;
    return { children, commentDetails };
  });

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
        {innerActionId === "ROOT" && (
          <CommentsAction
            isRoot={true}
            session={session}
            onComment={callbacks.onRootComment}
            onActionClose={callbacks.onActionClose}
          />
        )}
      </Wrapper>
    </Spinner>
  );
}

export default memo(Comments);
