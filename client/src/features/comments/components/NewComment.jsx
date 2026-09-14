import { useState } from "react";
import { newComment } from "../api/commentApi";
import ErrorToast from "../../../shared/components/ErrorToast";
import SuccessToast from "../../../shared/components/SuccessToast";
import { useQueryClient } from "@tanstack/react-query";

const NewComment = ({ postId }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleNewComment = () => {
    const submitComment = async (text, postId) => {
      setLoading(true);
      try {
        await newComment(text, postId);
        SuccessToast("New Comment Submitted Successfully");
        setText("");
        queryClient.invalidateQueries({
          queryKey: ["posts", postId, "comments"],
        });
      } catch (error) {
        ErrorToast(
          error.response?.data?.message ||
            "Something went wrong while submitting your comment",
        );
      } finally {
        setLoading(false);
      }
    };
    submitComment(text, postId);
  };

  return (
    <div className="w-132 p-4 pb-4">
      <hr className="text-neutral-300" />
      <div className="font-Poppins-Medium mt-4">
        <h4>Add a comment</h4>
        <textarea
          type="text"
          name="newComment"
          disabled={loading}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something to share..."
          className="mt-2 w-full resize-none rounded-lg border-2 border-neutral-300 bg-[#f1f1f1] p-5"
          rows={6}
          maxLength={500}
        />
        <div className="flex justify-between px-1">
          <span>{text.length}/500</span>
          <button
            onClick={handleNewComment}
            disabled={text.length < 1 || loading}
            className="font-Poppins-Medium cursor-pointer rounded-md bg-cyan-800 p-2 px-4 text-white transition-colors hover:bg-cyan-700 active:bg-cyan-700/90 disabled:cursor-not-allowed disabled:bg-gray-500"
          >
            {loading ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};
export default NewComment;
