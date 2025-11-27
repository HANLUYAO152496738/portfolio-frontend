import { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { blogAPI } from '../api/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogAPI.getAll();
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <section className="page-header">
        <h1 className="page-title rainbow-text">Blog</h1>
        <p className="page-subtitle">
          Thoughts, tutorials, and insights on web development
        </p>
      </section>

      <section className="blog-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="no-content">
            <p>No blog posts yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
