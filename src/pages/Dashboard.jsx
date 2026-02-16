import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fData = await fetch("http://localhost:3000/posts");
      const data = await fData.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editingTask = (task) => {
    navigate("/create-post", { state: { post: task } });
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      alert("Post Deleted Successfully 🗑️");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashbord-main">
        <div className="dashboard-welcome">
          <div className="welcome-text">
            <h1>Welcome to your Dashboard</h1>
            <p>
              Manage yoyr posts,track engagment,and connect with your audience.
            </p>
          </div>
        </div>

        <div className="dashboard-stats-overview">
          <div className="dash-card">
            <h3>total Posts</h3>
            <span className="dash-number">{tasks.length}</span>
          </div>

          <div className="dash-card">
            <h3>your Stories</h3>
            <span className="dash-number">5</span>
          </div>

          <div className="dash-card">
            <h3>Community Posts</h3>
            <span className="dash-number">10</span>
          </div>
        </div>

        <section className="posts-section">
          <div className="section-header">
            <h2 className="section-title">Recent feed</h2>
            <button
              className="create-shortcut-btn"
              onClick={() => navigate("/create-post")}
            >
              <FaPlus />
              New Post
            </button>
          </div>

          <div className="posts-grid">
            {tasks.map((task) => (
              <div className="post-card" key={task.id}>
                <div className="post-image-container">
                  <img
                    src={task.image}
                    alt="Post"
                    className="post-card-image"
                  />

                  <div className="post-actions">
                    <button
                      className="action-btn edit-btn"
                      title="Edit Post"
                      onClick={() => editingTask(task)}
                    >
                      <MdEdit size={22} color="white" />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete Post"
                      onClick={() => handleDelete(task.id)}
                    >
                      <MdDelete size={22} color="white" />
                    </button>
                  </div>
                </div>

                <div className="post-card-content">
                  <div className="post-meta">
                    <span className="post-author">{task.author}</span>
                    <span className="post-date">{task.createAt}</span>
                  </div>

                  <h3 className="post-card-title">{task.title}</h3>

                  <p className="post-card-description">{task.description}</p>

                  <button
                    className="read-more-btn"
                    onClick={() => navigate(`/post/${task.id}`)}
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;