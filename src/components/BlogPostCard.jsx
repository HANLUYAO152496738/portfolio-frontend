import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-card">
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-author">By {post.author?.username || 'Anonymous'}</span>
          <span className="blog-date">{formatDate(post.createdAt)}</span>
        </div>
        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">
          {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
        </p>
        <Link to={`/blog/${post._id}`} className="blog-read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
