import calculatePostDate from "../../util/calculatePostDate";
import { useState } from "react";
import ReplyBox from "./ReplyBox";
import PostVotes from "./PostVotes";
import { Post } from "../types/types";

type PostRepliesProps = {
  post: Post;
};

const PostReplies = ({ post }: PostRepliesProps) => {
  const [openedReplyBox, setOpenedReplyBox] = useState(null);

  const renderReplyBox = (postId: any) => {
    setOpenedReplyBox(openedReplyBox === postId ? null : postId);
  };
  return (
    <article key={post._id} className="mx-auto rounded-md mt-10">
      <div className="flex bg-white p-10 ">
        <PostVotes post={post} postType={"reply"} />
        <div className="flex-col">
          <div className="flex">
            <img
              src="/images/avatars/image-amyrobson.png"
              alt="User Icon"
              className="w-10 h-10 mr-4 -mt-2 rounded-full"
            ></img>
            <header className="mr-6">
              <h2 className="text-moderate-blue font-bold">{post.creator}</h2>
            </header>
            <time>{calculatePostDate(post.createdAt)}</time>
            <button
              className=" ml-80 flex"
              onClick={() => renderReplyBox(post._id)}
            >
              <img
                src="/images/icon-reply.svg"
                alt="Edit Arrow"
                className="m-auto mr-2 mt-2"
              ></img>
              Reply
            </button>
          </div>
          <section>
            <p>{post.replies}</p>
          </section>
        </div>
      </div>
      {openedReplyBox === post._id && (
        <ReplyBox creator={post.creator} postId={post._id} />
      )}
    </article>
  );
};

export default PostReplies;
