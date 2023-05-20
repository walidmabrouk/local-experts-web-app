import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/actions/postActions";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { Avatar } from "@mui/material";
import "./CreatePost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { GetProfile } from "../../redux/actions/profileActions";
import { Select, Space } from "antd";
const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.posts);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  console.log( category, description);
  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("category", category);
    dispatch(createPost(formData));
  
  };

  
  const navigate = useNavigate();
  useEffect(async () => {
    await dispatch(await GetProfile())
    if (isPostCreated) {
      navigate("/");
    }
    await dispatch(await fetchCategories());
  }, [isPostCreated, navigate]);
  const profile = useSelector((state) => state.profiles?.profile);

  const categories = useSelector((state) => state.categories.categories);

  return (
  
    <section className="create-post">
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <div className="tweetboxRow">
          <div className="tweetboxUserIcon">
            <Avatar src={profile.profilePhoto?.url} />
          </div>
          <div className="tweetbox-input-row">
            <Space wrap>
              <Select
                defaultValue=""
                style={{ width: 200 }}
                onChange={(value) => setCategory(value)}
              >
                <option disabled value="">
                  Catégorie cible
                </option>
                {categories?.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </Select>
            </Space>
            <textarea
              className="create-post-textarea"
              placeholder="Post Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="2"
            ></textarea>
          </div>
        </div>
        <div className="tweetboxRow">
          <div style={{ flex: 0.1 }}></div>
          <div className="tweetboxOptions">
            <label  className="create-post-upload">
              <FontAwesomeIcon
                icon={faImage}
                width={22}
                height={22}
                color="#007aff"
              />
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <span className="text-box">Photo</span>
            </label>

            <button type="submit" className="tweetbox-button">
              {loading ? (
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width={96}
                  visible={true}
                />
              ) : (
                "Publier"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
