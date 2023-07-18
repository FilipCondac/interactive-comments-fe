//Purpose: This file creates the reply box component
import postReply from "../../util/postReply";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

type ReplyBoxProps = {
  creator: string;
  postId: string;
};

const ReplyBox = ({ creator, postId }: ReplyBoxProps) => {
  const [reply, setReply] = useState(`@${creator} `);
  const { user, isAuthenticated } = useAuth0();

  const handlePostReply = (
    postId: string,
    reply: string,
    creator: string,
    creatorPicture: string
  ) => {
    postReply(reply, postId, creator, creatorPicture);
    location.reload();
  };

  return (
    <section className="bg-white mt-10 rounded-2xl flex p-4">
      {isAuthenticated ? (
        <div>
          <img
            src={user?.picture}
            alt="Your user icon"
            className="m-auto h-20 w-20  mr-4 rounded-full p-4"
          ></img>
          <textarea
            className="border-black border w-full"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          ></textarea>
          <button
            className=" bg-moderate-blue h-10 m-4 mx-4 px-4 rounded-lg p-2 text-sm text-white"
            onClick={() => {
              if (isAuthenticated && user) {
                handlePostReply(
                  postId,
                  reply,
                  user.name || "",
                  user.picture || ""
                );
              }
            }}
          >
            Reply
          </button>
        </div>
      ) : (
        <div className="m-auto">
          Please <LoginButton /> to reply
        </div>
      )}
    </section>
  );
};

export default ReplyBox;
