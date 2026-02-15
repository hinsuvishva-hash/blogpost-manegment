import {
  FaHeading,
  FaUser,
  FaLink,
  FaTimes,
  FaRegPaperPlane,
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import "./CreatePost.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editPost = location.state?.post;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [imageType, setImageType] = useState("url");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("blog_rdata"));

    if (editPost) {
      setFormData({
        title: editPost.title,
        author: editPost.author,
        description: editPost.description,
        imageUrl: editPost.image,
      });

      setPreview(editPost.image);

      if (editPost.image?.startsWith("blob:")) {
        setImageType("file");
      } else {
        setImageType("url");
      }
    } else if (userData) {
      setFormData((prev) => ({
        ...prev,
        author: userData.name,
      }));
    }
  }, [editPost]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 6) {
      newErrors.title = "Title must be at least 6 characters";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const postData = {
        title: formData.title,
        author: formData.author,
        description: formData.description,
        image: formData.imageUrl,
        createAt: editPost
          ? editPost.createAt
          : new Date().toLocaleDateString(),
      };

      if (editPost) {
        await fetch(`http://localhost:3000/posts/${editPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        alert("Post Updated Successfully ✏️");
      } else {
        await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });

        alert("Post Published Successfully 🚀");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      setFormData((prev) => ({
        ...prev,
        imageUrl: imageUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setFormData((prev) => ({
      ...prev,
      imageUrl: "",
    }));
  };

  const handleClearForm = () => {
    setFormData({
      title: "",
      author: editPost ? editPost.author : formData.author,
      description: "",
      imageUrl: "",
    });
    setPreview("");
    setErrors({});
    setImageType("url");
  };

  return (
    <div className="create-post-page">
      <Navbar />

      <div className="create-post-container">
        <header className="form-header">
          <h1>{editPost ? "Edit Post" : "Create New Post"}</h1>
          <p>
            {editPost
              ? "Update your post details below."
              : "Share your thoughts and stories with the world!"}
          </p>
        </header>

        <div className="post-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              {errors.title && (
                <p className="error-text">{errors.title}</p>
              )}
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="author"
                  className="form-control"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
              {errors.author && (
                <p className="error-text">{errors.author}</p>
              )}
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <p className="error-text">{errors.description}</p>
              )}
            </div>

            <div className="form-group">
              <label>Cover Image</label>

              <div className="image-source-tabs">
                <button
                  type="button"
                  className={`tab-btn ${imageType === "url" ? "active" : ""}`}
                  onClick={() => setImageType("url")}
                >
                  Image URL
                </button>

                <button
                  type="button"
                  className={`tab-btn ${imageType === "file" ? "active" : ""}`}
                  onClick={() => setImageType("file")}
                >
                  Upload File
                </button>
              </div>

              {imageType === "url" && !preview && (
                <div className="input-wrapper">
                  <FaLink className="input-icon" />
                  <input
                    type="url"
                    name="imageUrl"
                    className="form-control"
                    value={formData.imageUrl}
                    onChange={(e) => {
                      handleChange(e);
                      setPreview(e.target.value);
                    }}
                  />
                </div>
              )}

              {imageType === "file" && !preview && (
                <div className="image-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              )}

              {preview && (
                <div className="image-preview-container">
                  <img
                    src={preview}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="form-actions-row">
              <button type="submit" className="submit-btn">
                <FaRegPaperPlane />
                {editPost ? "Update Post" : "Publish Post"}
              </button>

              <button
                type="button"
                className="cancle-btn"
                onClick={handleClearForm}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;