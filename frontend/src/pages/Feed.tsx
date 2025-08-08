// src/components/Feed.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../styles/styles.css';
import AnimatedMenuItem from '../components/AnimatedMenuItem';


dayjs.extend(relativeTime);

// Type definitions
interface Media {
  type: 'image' | 'video';
  src: string;
}

interface Post {
  id?: string | number;
  content?: string;
  media?: Media | string;
  mediaType?: string; // for legacy support
  image?: string;
  video?: string;
  timestamp?: string;
}

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const direction = index % 2 === 0 ? -100 : 100;

  const [liked, setLiked] = useState(false);
  const [hoveringAvatar, setHoveringAvatar] = useState(false);

  const media: Media | null = (() => {
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
      layout
      initial={{ opacity: 0, x: direction }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="post-card"
    >
      <div className="flex items-start">
        <div
          className="avatar-holder"
          onMouseEnter={() => setHoveringAvatar(true)}
          onMouseLeave={() => setHoveringAvatar(false)}
        >
          <img
            src="/images/admin-avatar.png"
            alt="Admin Avatar"
            className="avatar-img"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "/images/default-avatar.png";
            }}
          />
          {hoveringAvatar && (
            <div className="hovercard">
              <h4>Admin</h4>
              <p>Content Manager • Joined 2024</p>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-gray-800">Admin</h4>
            <span className="text-xs text-gray-500">
              {post.timestamp ? dayjs(post.timestamp).fromNow() : 'Just now'}
            </span>
          </div>

          {post.content && (
            <p className="text-gray-800 text-sm mt-1">{post.content}</p>
          )}

          {media && (
            <div className="post-media mt-3">
              {media.type === 'image' ? (
                <img
                  src={media.src}
                  alt="Post Media"
                  className="media-item rounded-md"
                />
              ) : media.type === 'video' ? (
                <video controls className="media-item rounded-md" width="100%">
                  <source src={media.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>
          )}

          <div className="post-actions mt-3">
            <button
              className={`like-button ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              ❤️ {liked ? 'Liked' : 'Like'}
            </button>
            <button className="share-button">🔗 Share</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface FeedProps {
  posts: Post[];
}

const Feed: React.FC<FeedProps> = ({ posts }) => {
  return (
    <div className="feed-container">
      <aside className="sidebar-left">
        <div className="sidebar-content">
          <h2 className="sidebar-title">Menu</h2>
          <ul className="sidebar-links">
            <AnimatedMenuItem label="Explore" link="/explore" animationKey="explore" />
            <AnimatedMenuItem label="Learning & Impact" link="learn" animationKey="learn" />
            <AnimatedMenuItem label="Donations and Partnerships" animationKey="donate" />
            <AnimatedMenuItem label="Messages" animationKey="messages" />
            <AnimatedMenuItem label="Careers And Opportunities" animationKey="careers" />
          </ul>
        </div>
      </aside>

      <main className="feed-main">
        <div className="feed-header">
          // <h1 className="feed-title">ITEPADS</h1>
        </div>

        <div className="posts-container">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet.</p>
          ) : (
            posts.map((post, idx) => (
              <PostCard
                key={post.id || post.timestamp || `post-${idx}`}
                post={post}
                index={idx}
              />
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
