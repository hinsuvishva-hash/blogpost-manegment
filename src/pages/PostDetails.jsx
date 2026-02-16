import React from "react";
import { FaArrowLeft, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";
import "./PostDetails.css";
import Navbar from "../Components/Navbar";

const PostDetails = () => {
  return (
    <div className="Post-details-page">
      <Navbar />
      <main className="post-details-container">
        <button className="back-btn">
          <FaArrowLeft /> Back to Feed
        </button>
        <article className="full-post">
          <header className="post-header">
            <div className="post-category">Journal</div>
            <h1 className="post-full-title">Sample Blog Post Title</h1>
            <div className="post-author-meta">
              <div className="author-info">
                <div className="author-avatar">A</div>
                <div>
                  <span className="author-name">Admin</span>
                  <div className="post-date-row">
                    <span>
                      <FaCalendarAlt /> 16/02/2026
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
            src=""
            alt="Post"
            />
          </div>
          <div className="post-body">
            <p>
              This is static blog post content example. 
              you can keep your full UI design without any javascript logic.
            </p>
            <p>
            This layout structure remains exactly the same as your dynamic 
            but now it work as a pure static UI Component.
            </p>
          </div>
          <footer className="post-footer">
            <div className="post-share">
              <span>Share this Story </span>
            <div className="share-buttons">
              <button className="share-btn">Twitter</button>
              <button className="share-btn">LinkedIn</button>
              <button className="share-btn">Link</button>
            </div>
            </div>
            </footer>
        </article>
      </main>
    </div>
  );
};

export default PostDetails;