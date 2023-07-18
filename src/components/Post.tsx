import getPosts from "../../util/getPosts";
import calculatePostDate from "../../util/calculatePostDate";
import { useEffect, useState } from "react";
import ReplyBox from "./ReplyBox";
import PostVotes from "./PostVotes";
import Reply from "./Reply";
import { useAuth0 } from "@auth0/auth0-react";

interface Post {
  _id: string;
  creator: string;
  creatorPicture: string;
  content: string;
  likes: Array<string>;
  createdAt: Date;
  replies: Array<string>;
}

const Post = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [openedReplyBox, setOpenedReplyBox] = useState(null);
  const { user, isAuthenticated } = useAuth0();

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
    getPosts().then((res) => setPosts(res));
  }, [posts]);

  const renderReplyBox = (postId: any) => {
    setOpenedReplyBox(openedReplyBox === postId ? null : postId);
  };

  return (
    <div>
      {posts.map((post: Post) => (
        <article key={post._id} className="mx-auto mt-10 w-1/2">
          <div className="flex bg-white p-10 rounded-2xl ">
            <PostVotes post={post} postType={"post"} />
            <div className="flex-col w-full">
              <div className="flex w-full">
                <img
                  src={post.creatorPicture}
                  alt="User Icon"
                  className="w-10 h-10 mr-4 -mt-2 rounded-full"
                ></img>
                <header className="mr-6">
                  <h2 className="font-bold">{post.creator}</h2>
                </header>
                <time className="text-sm text-gray-400">
                  {calculatePostDate(post.createdAt)}
                </time>
                {!isUserPostCreator(post.creator) ? (
                  <button
                    className="ml-auto flex"
                    onClick={() => renderReplyBox(post._id)}
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
                      onClick={() => deleteComment(post._id)}
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
                      onClick={() => editComment(post._id)}
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
              <section>
                <p className="mt-2 text-gray-500">{post.content}</p>
              </section>
            </div>
          </div>
          {openedReplyBox === post._id && (
            <ReplyBox creator={post.creator} postId={post._id} />
          )}

          <Reply postId={post._id} />
        </article>
      ))}
    </div>
  );
};

export default Post;
