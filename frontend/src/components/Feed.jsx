import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/styles.css';
import AnimatedMenuItem from '../components/AnimatedMenuItem';

dayjs.extend(relativeTime);

const PostCard = ({ post, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const direction = index % 2 === 0 ? -50 : 50;

  const media = (() => {
    if (post.media) {
      if (typeof post.media === 'string') {
        const isVideo = post.mediaType === 'video' || post.media.includes('video');
        return { type: isVideo ? 'video' : 'image', src: post.media };
      } else if (typeof post.media === 'object' && post.media.src) {
        return post.media;
      }
    } else if (post.image) {
      return { type: 'image', src: post.image };
    } else if (post.video) {
      return { type: 'video', src: post.video };
    }
    return null;
  })();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'tween', duration: 0.5 }}
      className="post-card"
    >
      <div className="post-header">
        <div className="avatar-holder">
          <img
            src="/images/admin-avatar.png"
            alt="Admin Avatar"
            className="avatar-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-avatar.png";
            }}
          />
        </div>
        <div className="post-meta">
          <div className="author">Admin</div>
          <div className="timestamp">
            {post.timestamp ? dayjs(post.timestamp).fromNow() : 'Just now'}
          </div>
        </div>
      </div>

      {post.content && <p className="post-text">{post.content}</p>}

      {media && (
        <div className="post-media">
          {media.type === 'image' ? (
            <img src={media.src} alt="Post Media" className="media-item" />
          ) : media.type === 'video' ? (
            <video controls className="media-item">
              <source src={media.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      )}
    </motion.div>
  );
};

const Feed = ({ posts }) => {
  return (
    <div className="feed-container">
      <aside className="sidebar-left">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-links">
            <AnimatedMenuItem label="Explore" link="/explore" animationKey="explore" />
            <AnimatedMenuItem label="Learning & Impact" animationKey="learn" />
            <AnimatedMenuItem label="Donations and Partnerships" animationKey="donate" />
            <AnimatedMenuItem label="Messages" animationKey="messages" />
            <AnimatedMenuItem label="Careers And Opportunities" animationKey="careers" />
          </ul>
        </div>
      </aside>

      <main className="feed-main">
        <h1 className="feed-title">SombezaPwani</h1>
        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            posts.map((post, idx) => (
              <PostCard key={post.id || idx} post={post} index={idx} />
            ))
          )}
        </div>
      </main>

      <aside className="sidebar-right">
        <div className="sidebar-content">
          <h3 className="sidebar-title">Support Our Platform</h3>
          <p>Your donations help us keep this platform running.</p>
          <button className="btn-donate">Donate Now</button>
        </div>
        <div className="sidebar-content">
          <h3 className="sidebar-title">Advertise With Us</h3>
          <p>Want your brand to be seen? Reach thousands of users.</p>
        </div>
      </aside>
    </div>
  );
};

export default Feed;
