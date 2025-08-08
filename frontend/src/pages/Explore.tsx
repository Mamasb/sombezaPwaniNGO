.explore-container {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100%;
}

.explore-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
}

.explore-image.active {
  z-index: 1;
}

.explore-content {
  position: absolute;
  bottom: 15%;
  left: 5%;
  color: #fff;
  z-index: 2;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  border-radius: 8px;
}

.nav-button {
  position: absolute;
  top: 50%;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  padding: 0.8rem;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  transform: translateY(-50%);
}

.nav-button.left {
  left: 1rem;
}

.nav-button.right {
  right: 1rem;
}

.dots-container {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
}

.dot {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: white;
}

.explore-pattern {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 20px
  );
  z-index: 1;
}
