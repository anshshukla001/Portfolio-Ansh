import { motion } from 'framer-motion'
import { FiFolder, FiExternalLink, FiGithub } from 'react-icons/fi'
import styles from '../styles/Projects.module.css'

const projects = [
  {
    title: 'Hostel Hub',
    description: 'A hostel management web app that lets students request gate passes, submit complaints, and edit profiles while allowing wardens to approve/reject passes, resolve complaints, and oversee student profiles.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    image: null,
    color: '#6366f1',
    live: '#',
    code: 'https://github.com/anshshukla001/Hostel-Hub',
  },
  {
    title: 'SubPilot',
    description: 'A full-stack mobile app that helps users track and manage their recurring subscriptions in one centralized dashboard, with automated email reminders before renewal dates.',
    tech: ['React Native', 'Expo', 'TypeScript', 'MongoDB'],
    image: null,
    color: '#f43f5e',
    live: '#',
    code: 'https://github.com/anshshukla001/SubPilot',
  },
  {
    title: 'Portfolio',
    description: 'A modern, responsive personal portfolio website built with React.js and Vite to showcase skills, projects, experience, and contact information with smooth animations.',
    tech: ['React', 'Vite', 'Framer Motion', 'CSS Modules'],
    image: null,
    color: '#0ea5e9',
    live: '#',
    code: 'https://github.com/anshshukla001/Portfolio-Ansh',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Projects() {
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

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
      </div>
    </section>
  )
}
