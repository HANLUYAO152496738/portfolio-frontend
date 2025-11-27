import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI, commentsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const BlogPost = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await blogAPI.getOne(id);
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentBody.trim()) return;

    setSubmitting(true);
    setCommentError(null);

    try {
      await commentsAPI.create(id, { body: commentBody });
      setCommentBody('');
      fetchPost(); // Refresh to show new comment
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="error-container">
        <h2>Post Not Found</h2>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <article className="blog-post-article">
        <header className="blog-post-header">
          <Link to="/blog" className="back-link">&larr; Back to Blog</Link>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-author">By {post.author?.username || 'Anonymous'}</span>
            <span className="blog-post-date">{formatDate(post.createdAt)}</span>
          </div>
        </header>

        <div className="blog-post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h2 className="comments-title">Comments ({post.comments?.length || 0})</h2>

        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
              rows="3"
              required
            />
            {commentError && <p className="error-message">{commentError}</p>}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Login</Link> to leave a comment.
          </p>
        )}

        <div className="comments-list">
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className="comment-card">
                <div className="comment-header">
                  <span className="comment-author">{comment.author?.username || 'Anonymous'}</span>
                  <span className="comment-date">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="comment-body">{comment.body}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
