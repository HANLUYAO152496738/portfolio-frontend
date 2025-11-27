import { useState } from 'react';
import { contactAPI } from '../api/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.submit(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <h1 className="page-title rainbow-text">Get In Touch</h1>
        <p className="page-subtitle">
          Have a question or want to work together? I'd love to hear from you.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="contact-info-card">
            <h3>Email</h3>
            <p>contact@example.com</p>
          </div>
          <div className="contact-info-card">
            <h3>Location</h3>
            <p>Available Worldwide</p>
          </div>
          <div className="contact-info-card">
            <h3>Social</h3>
            <p>GitHub | LinkedIn | Twitter</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {success && (
            <div className="success-message">
              Thank you for your message! I'll get back to you soon.
            </div>
          )}
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your message..."
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
