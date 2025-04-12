import React from 'react';
import '../styles/Explore.css'; // Ensure this path is correct

const Explore = () => {
  // Using public folder images (absolute paths)
  const images = [
    '/assets/images/image1.jpg',
    '/assets/images/image2.jpg',
    '/assets/images/image3.jpg',
  ];

  return (
    <div className="explore-container">
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="explore-image"
            style={{
              backgroundImage: `url(${image})`,
              animationDelay: `${index * 5}s`,
            }}
          ></div>
        ))
      ) : (
        <p>No images available to display</p>
      )}

      <div className="explore-content">
        <h1>Explore New and Exciting Posts</h1>
        <p>Stay tuned as images transition dynamically!</p>
      </div>

      <div className="explore-pattern"></div>
    </div>
  );
};

export default Explore;
