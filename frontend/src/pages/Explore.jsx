import React from 'react';
import '../styles/Explore.css'; // Make sure the path is correct

const Explore = () => {
  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore New Posts</h1>
      <div className="explore-list">
        {/* Example items - replace with dynamic content */}
        <div className="explore-item">
          <img src="https://via.placeholder.com/300" alt="Post" />
          <div className="explore-item-content">
            <h3 className="explore-item-title">Post Title 1</h3>
            <p className="explore-item-description">
              This is a description of the post. Click to explore more.
            </p>
            <a href="#" className="explore-item-button">View More</a>
          </div>
        </div>
        <div className="explore-item">
          <img src="https://via.placeholder.com/300" alt="Post" />
          <div className="explore-item-content">
            <h3 className="explore-item-title">Post Title 2</h3>
            <p className="explore-item-description">
              This is another description. Click to see more details.
            </p>
            <a href="#" className="explore-item-button">View More</a>
          </div>
        </div>
        {/* More items can go here */}
      </div>
    </div>
  );
};

export default Explore;
