import React, { useState, useEffect } from 'react';
import '../styles/Explore.css'; // Ensure this path is correct

const Explore = () => {
  // Using public folder images (absolute paths)
  const images = [
    { url: '/assets/images/image1.jpeg', description: 'A beautiful landscape at sunset.' },
    { url: '/assets/images/image2.jpeg', description: 'The serenity of a mountain lake.' },
    { url: '/assets/images/image3.jpeg', description: 'A bustling city skyline at night.' },
    { url: '/assets/images/image4.jpeg', description: 'A peaceful forest in the morning light.' },
    { url: '/assets/images/image5.jpeg', description: 'A stunning beach view with clear water.' },
    { url: '/assets/images/image6.jpeg', description: 'The vibrancy of a busy street market.' },
    { url: '/assets/images/image7.jpeg', description: 'A close-up of nature’s details: flowers and dew.' },
    { url: '/assets/images/image8.jpeg', description: 'The stillness of a calm river during dawn.' },
    { url: '/assets/images/image9.jpeg', description: 'A scenic aerial view of a sprawling city.' },
    { url: '/assets/images/image10.jpeg', description: 'The grandeur of a snow-capped mountain range.' }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to change the image index every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="explore-container">
      {images && images.length > 0 ? (
        images.map((image, index) => (
          <div
            key={index}
            className="explore-image"
            style={{
              backgroundImage: `url(${image.url})`,
              animationDelay: `${index * 5}s`,
              opacity: index === currentImageIndex ? 1 : 0, // Fade in/out images based on index
            }}
          ></div>
        ))
      ) : (
        <p>No images available to display</p>
      )}

      <div className="explore-content">
        <h1>Explore New and Exciting Posts</h1>
        <p>{images[currentImageIndex].description}</p>
      </div>

      <div className="explore-pattern"></div>
    </div>
  );
};

export default Explore;
