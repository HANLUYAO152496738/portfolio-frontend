import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-greeting">Hello, I'm</span>
            <span className="hero-name rainbow-text">Developer</span>
          </h1>
          <p className="hero-subtitle">
            Full-Stack Web Developer | Creating Beautiful Digital Experiences
          </p>
          <p className="hero-description">
            I'm passionate about building modern, responsive web applications
            using cutting-edge technologies. Let's create something amazing together.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="rainbow-orb"></div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies.
              I love creating user-friendly applications that solve real-world problems.
            </p>
            <p>
              My journey in web development started with curiosity and has evolved into
              a career focused on building scalable, maintainable, and beautiful applications.
            </p>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Frontend</h3>
              <p>React, JavaScript, HTML5, CSS3, Tailwind</p>
            </div>
            <div className="skill-card">
              <h3>Backend</h3>
              <p>Node.js, Express, MongoDB, REST APIs</p>
            </div>
            <div className="skill-card">
              <h3>Tools</h3>
              <p>Git, VS Code, Postman, Vercel, Render</p>
            </div>
            <div className="skill-card">
              <h3>Learning</h3>
              <p>TypeScript, Next.js, GraphQL, Docker</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Let's Work Together</h2>
        <p className="cta-text">
          Have a project in mind? I'd love to hear about it.
        </p>
        <Link to="/contact" className="btn btn-primary btn-large">
          Contact Me
        </Link>
      </section>
    </div>
  );
};

export default Home;
