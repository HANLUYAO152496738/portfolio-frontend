import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projectsAPI } from '../api/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading projects...</p>
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
    <div className="projects-page">
      <section className="page-header">
        <h1 className="page-title rainbow-text">My Projects</h1>
        <p className="page-subtitle">
          A collection of my work showcasing various technologies and skills
        </p>
      </section>

      <section className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <div className="no-content">
            <p>No projects yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
