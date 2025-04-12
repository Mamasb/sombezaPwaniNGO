import React from 'react';
import { motion } from 'framer-motion';

const Feed = ({ posts }) => {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Home Feed</h1>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available</p>
        ) : (
          posts.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-white shadow rounded-xl border border-gray-100"
            >
              <p className="text-gray-800">{post.content}</p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
