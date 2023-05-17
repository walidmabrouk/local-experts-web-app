import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCommment } from "../redux/actions/postActions";

const AddComment = ({postId}) => {
  const [text, setText] = useState("");
    const dispatch = useDispatch();
  // Form Submit Handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something");
    await dispatch(createCommment({ text, postId }));
    setText("");
    };

    

  return (
    <form onSubmit={formSubmitHandler} className="add-comment">
      <input
        type="text"
        placeholder="Add a comment"
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        Comment
      </button>
    </form>
  );
};

export default AddComment;
