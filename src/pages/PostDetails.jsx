import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaClock } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import "./PostDetails.css";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="Post-details-page">
      <Navbar />

      <main className="post-details-container">
        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft /> Back to Feed
        </button>

        <article className="full-post">
          <header className="post-header">
            <div className="post-category">Journal</div>

            <h1 className="post-full-title">
              {post.title}
            </h1>

            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">
                  {post.author?.charAt(0)}
                </div>

                <div>
                  <span className="author-name">
                    {post.author}
                  </span>

                  <div className="post-date-row">
                    <span>
                      <FaCalendarAlt /> {post.createAt}
                    </span>

                    <span>
                      <FaClock /> 5 min read
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="post-featured-image">
            <img
              src={post.image}
              alt="Post"
            />
          </div>

          <div className="post-body">
            <p>{post.description}</p>
          </div>
        </article>
      </main>
    </div>
  );
};

export default PostDetails;