import { useState, useEffect } from 'react';
import { projectsAPI, blogAPI, contactAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    repoUrl: '',
    liveUrl: ''
  });
  const [editingProject, setEditingProject] = useState(null);

  // Blog state
  const [posts, setPosts] = useState([]);
  const [postForm, setPostForm] = useState({
    title: '',
    content: ''
  });
  const [editingPost, setEditingPost] = useState(null);

  // Messages state
  const [messages, setMessages] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch data on mount and tab change
  useEffect(() => {
    if (activeTab === 'projects') fetchProjects();
    if (activeTab === 'blog') fetchPosts();
    if (activeTab === 'messages') fetchMessages();
  }, [activeTab]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Projects functions
  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (err) {
      setError('Failed to load projects');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectForm);
        setSuccess('Project updated successfully!');
      } else {
        await projectsAPI.create(projectForm);
        setSuccess('Project created successfully!');
      }
      setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      repoUrl: project.repoUrl || '',
      liveUrl: project.liveUrl || ''
    });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      setSuccess('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete project');
    }
  };

  const cancelProjectEdit = () => {
    setEditingProject(null);
    setProjectForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
  };

  // Blog functions
  const fetchPosts = async () => {
    try {
      const response = await blogAPI.getAll();
      setPosts(response.data);
    } catch (err) {
      setError('Failed to load blog posts');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (editingPost) {
        await blogAPI.update(editingPost._id, postForm);
        setSuccess('Post updated successfully!');
      } else {
        await blogAPI.create(postForm);
        setSuccess('Post created successfully!');
      }
      setPostForm({ title: '', content: '' });
      setEditingPost(null);
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content
    });
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await blogAPI.delete(id);
      setSuccess('Post deleted successfully!');
      fetchPosts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete post');
    }
  };

  const cancelPostEdit = () => {
    setEditingPost(null);
    setPostForm({ title: '', content: '' });
  };

  // Messages functions
  const fetchMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      setMessages(response.data);
    } catch (err) {
      setError('Failed to load messages');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title rainbow-text">Admin Dashboard</h1>
        <p className="admin-welcome">Welcome, {user?.username}!</p>
      </div>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
          onClick={() => setActiveTab('blog')}
        >
          Blog Posts
        </button>
        <button
          className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>

      <div className="admin-content">
        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="admin-section">
            <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleProjectSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="projectTitle">Title *</label>
                <input
                  type="text"
                  id="projectTitle"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  placeholder="Project title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="projectDescription">Description *</label>
                <textarea
                  id="projectDescription"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  rows="4"
                  placeholder="Project description"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectImage">Image URL</label>
                  <input
                    type="url"
                    id="projectImage"
                    value={projectForm.imageUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectRepo">Repository URL</label>
                  <input
                    type="url"
                    id="projectRepo"
                    value={projectForm.repoUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, repoUrl: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="projectLive">Live URL</label>
                  <input
                    type="url"
                    id="projectLive"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Add Project')}
                </button>
                {editingProject && (
                  <button type="button" className="btn btn-secondary" onClick={cancelProjectEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2>Your Projects</h2>
            <div className="admin-list">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project._id} className="admin-list-item">
                    <div className="admin-list-info">
                      <h3>{project.title}</h3>
                      <p>{project.description.substring(0, 100)}...</p>
                    </div>
                    <div className="admin-list-actions">
                      <button
                        className="btn btn-small btn-edit"
                        onClick={() => handleEditProject(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-delete"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-items">No projects yet. Create your first project above!</p>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="admin-section">
            <h2>{editingPost ? 'Edit Blog Post' : 'Create New Post'}</h2>
            <form onSubmit={handlePostSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="postTitle">Title *</label>
                <input
                  type="text"
                  id="postTitle"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  required
                  placeholder="Blog post title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postContent">Content *</label>
                <textarea
                  id="postContent"
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  required
                  rows="8"
                  placeholder="Write your blog post content here..."
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingPost ? 'Update Post' : 'Publish Post')}
                </button>
                {editingPost && (
                  <button type="button" className="btn btn-secondary" onClick={cancelPostEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <h2>Your Blog Posts</h2>
            <div className="admin-list">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="admin-list-item">
                    <div className="admin-list-info">
                      <h3>{post.title}</h3>
                      <p className="admin-list-meta">
                        By {post.author?.username} | {formatDate(post.createdAt)}
                      </p>
                    </div>
                    <div className="admin-list-actions">
                      <button
                        className="btn btn-small btn-edit"
                        onClick={() => handleEditPost(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-small btn-delete"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-items">No blog posts yet. Write your first post above!</p>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="admin-section">
            <h2>Contact Messages</h2>
            <div className="admin-list messages-list">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg._id} className="message-card">
                    <div className="message-header">
                      <strong>{msg.name}</strong>
                      <span>{msg.email}</span>
                      <span className="message-date">{formatDate(msg.createdAt)}</span>
                    </div>
                    <p className="message-body">{msg.message}</p>
                  </div>
                ))
              ) : (
                <p className="no-items">No messages yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
