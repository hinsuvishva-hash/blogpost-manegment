import { FaHeading, FaUser, FaLink, FaCloudUploadAlt,FaTimes,FaRegPaperPlane } from "react-icons/fa";
import Navbar from "../Components/Navbar";
import './CreatePost.css';


const CreatePost = () => {
  return (
    <div className="create-post-page">
      <Navbar/>
      <div className="create-post-container">
        <header className="form-header">
          <h1>Create New Post</h1>
          <p>Share your thought and storis with the word!</p>
        </header>
        <div className="post-form-card">
          <form>
            <div className="form-group">
              <label>Post Title</label>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input 
                type="text"
                name="title"
                className="form-control"
                placeholder="Enater a catchy title...."
                />
              </div>
            </div>
            <div className="form-group">
              <label >
                Author NAme
              </label>
              <div className="input-wrapper">
                <FaUser className="input-icon"/>
                <input
                   type="text"
                   name="author"
                   className="form-control"
                   placeholder="Your name"
                  />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost;