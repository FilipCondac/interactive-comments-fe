import { useEffect, useState } from "react";
import calculatePostDate from "../../util/calculatePostDate";
import PostVotes from "./PostVotes";
import ReplyBox from "./ReplyBox";
import getReplies from "../../util/getReplies";
import { useAuth0 } from "@auth0/auth0-react";

type ReplyProps = {
  postId: string;
};

interface Reply {
  _id: string;
  creator: string;
  creatorPicture: string;
  content: string;
  likes: Array<string>;
  createdAt: Date;
  postId: string;
}

const Reply = ({ postId }: ReplyProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openedReplyBox, setOpenedReplyBox] = useState(null);
  const [repliesData, setRepliesData] = useState<Array<Reply>>([]);
  const { user, isAuthenticated } = useAuth0();

  const renderReplyBox = (postId: any) => {
    setOpenedReplyBox(openedReplyBox === postId ? null : postId);
  };

  const isUserPostCreator = (creator: string) => {
    if (user?.name === creator) {
      return true;
    } else {
      return false;
    }
  };

  const deleteComment = (commentId: string) => {};

  const editComment = (commentId: string) => {};

  useEffect(() => {
    getReplies(postId)
      .then((res) => {
        setRepliesData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load replies:", error);
        setIsLoading(false);
      });
  }, [postId]);

  return (
    <div className="flex-col border-l-2 ml-12">
      {isLoading ? (
        <div>Loading...</div> // Replace this with a loading spinner
      ) : (
        repliesData.map((reply: Reply) => (
          <article
            key={reply._id}
            className="rounded-md mt-10 w-10/12 ml-auto "
          >
            <div className="flex bg-white p-10 rounded-2xl">
              <PostVotes post={reply} postType={"reply"} />
              <div className="flex-col w-full">
                <div className="flex w-full">
                  <img
                    src={reply.creatorPicture}
                    alt="User Icon"
                    className="w-10 h-10 mr-4 -mt-2 rounded-full"
                  ></img>
                  <header className="mr-6">
                    <h2 className="font-bold">{reply.creator}</h2>
                  </header>
                  <time className="text-sm text-gray-400">
                    {calculatePostDate(reply.createdAt)}
                  </time>
                  {!isUserPostCreator(reply.creator) ? (
                    <button
                      className="ml-auto flex"
                      onClick={() => renderReplyBox(reply._id)}
                    >
                      <img
                        src="/images/icon-reply.svg"
                        alt="Edit Arrow"
                        className="mr-2 mt-2"
                      ></img>
                      <span className="font-bold">Reply</span>
                    </button>
                  ) : (
                    <div className="flex ml-auto">
                      <button
                        className="ml-auto flex text-red-500 mr-5"
                        onClick={() => deleteComment(reply._id)}
                      >
                        <img
                          src="/images/icon-delete.svg"
                          alt="Edit Arrow"
                          className="mr-2 mt-2"
                        ></img>
                        <span className="font-bold mt-1">Delete</span>
                      </button>
                      <button
                        className="ml-auto flex text-moderate-blue"
                        onClick={() => editComment(reply._id)}
                      >
                        <img
                          src="/images/icon-edit.svg"
                          alt="Edit Arrow"
                          className="mr-2 mt-2"
                        ></img>
                        <span className="font-bold mt-1">Edit</span>
                      </button>
                    </div>
                  )}
                </div>
                <section className="mt-2 text-gray-500">
                  {reply.content.split(" ").map((word, index) =>
                    index === 0 ? (
                      <span
                        key={index}
                        className="text-moderate-blue font-bold"
                      >
                        {word}
                      </span>
                    ) : (
                      <span key={index}>{" " + word}</span>
                    )
                  )}
                </section>
              </div>
            </div>
            {openedReplyBox === reply._id && (
              <ReplyBox creator={reply.creator} postId={postId} />
            )}
          </article>
        ))
      )}
    </div>
  );
};

export default Reply;
