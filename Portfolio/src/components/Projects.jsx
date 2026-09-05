import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFolder, FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styles from '../styles/Projects.module.css'

const projects = [
  {
    title: 'Crypto Verse',
    description: 'A cryptocurrency tracking application that provides real-time data, charts, and market insights for various digital currencies.',
    tech: ['React', 'Redux', 'Ant Design', 'RapidAPI'],
    image: null,
    color: '#6366f1',
    live: '#',
    code: '#',
  },
  {
    title: 'AI Thief Detection',
    description: 'An AI-powered security system that uses computer vision and machine learning to detect and alert about suspicious activities in real-time.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
    image: null,
    color: '#f43f5e',
    live: '#',
    code: '#',
  },
  {
    title: 'Weather App',
    description: 'A weather forecasting application with beautiful UI that provides current weather, forecasts, and location-based weather data.',
    tech: ['React', 'OpenWeather API', 'CSS3', 'Geolocation'],
    image: null,
    color: '#0ea5e9',
    live: '#',
    code: '#',
  },
  {
    title: 'Task Manager',
    description: 'A full-stack task management application with authentication, drag-and-drop functionality, and real-time updates.',
    tech: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    image: null,
    color: '#06b6d4',
    live: '#',
    code: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with React and Framer Motion featuring smooth animations and responsive design.',
    tech: ['React', 'Framer Motion', 'CSS Modules', 'Vite'],
    image: null,
    color: '#f59e0b',
    live: '#',
    code: '#',
  },
  {
    title: 'Chat Application',
    description: 'A real-time chat application with private messaging, group chats, and media sharing capabilities.',
    tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
    image: null,
    color: '#8b5cf6',
    live: '#',
    code: '#',
  },
]

const PROJECTS_PER_PAGE = 3

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const currentProjects = projects.slice(
    currentPage * PROJECTS_PER_PAGE,
    (currentPage + 1) * PROJECTS_PER_PAGE
  )

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <p className="section-subtitle">
            <FiFolder className="icon" />
            Projects
          </p>
          <h2 className="section-title">
            Interactive <span className="gradient-text">Project Showcase</span>
          </h2>
          <p className="section-description">
            A collection of projects that showcase my skills and passion for development
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className={styles.grid}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            {currentProjects.map((project, i) => (
              <motion.div
                key={project.title}
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div
                  className={styles.cardImage}
                  style={{
                    background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)`,
                  }}
                >
                  <div className={styles.cardImageIcon} style={{ color: project.color }}>
                    <FiFolder size={48} />
                  </div>
                  <div className={styles.cardOverlay}>
                    <a href={project.live} className={styles.overlayBtn} aria-label="Live Demo">
                      <FiExternalLink size={18} />
                    </a>
                    <a href={project.code} className={styles.overlayBtn} aria-label="View Code">
                      <FiGithub size={18} />
                    </a>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <div className={styles.techStack}>
                    {project.tech.map((t) => (
                      <span key={t} className={styles.techTag}>{t}</span>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    <a href={project.code} className={styles.codeBtn}>
                      <FiGithub size={16} />
                      Code
                    </a>
                    <a href={project.live} className={styles.liveBtn}>
                      <FiExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <motion.div
          className={styles.pagination}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
          >
            <FiChevronLeft size={18} />
            Previous
          </button>

          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`${styles.pageNumber} ${currentPage === i ? styles.pageActive : ''}`}
                onClick={() => setCurrentPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Next
            <FiChevronRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
