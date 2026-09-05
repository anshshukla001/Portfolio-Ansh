import { motion } from 'framer-motion'
import { FiBookOpen, FiCalendar, FiAward } from 'react-icons/fi'
import styles from '../styles/Education.module.css'

const educationData = [
  {
    degree: 'Bachelor of Engineering (B.E) — Computer Science & Engineering',
    institution: 'Chitkara University, Rajpura, Punjab',
    period: '2022 - 2026',
    description: 'Pursuing B.E in Computer Science & Engineering with a CGPA of 8.22.',
    achievements: ['CGPA: 8.22', 'Technical Projects', 'Coding Competitions'],
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'Bhartiya Vidya Mandir, Kitchlu Nagar, Ludhiana, Punjab',
    period: '2020 - 2022',
    description: 'Completed higher secondary education with focus on Science and Mathematics.',
    achievements: ['Science Stream', 'Strong Academic Record'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <p className="section-subtitle">
            <FiBookOpen className="icon" />
            Education
          </p>
          <h2 className="section-title">
            My <span className="gradient-text">Academic Journey</span>
          </h2>
          <p className="section-description">
            A timeline of my educational background and achievements
          </p>
        </motion.div>

        <div className={styles.timeline}>
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className={styles.timelineItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i * 0.2}
            >
              <div className={styles.timelineDot} />
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.degree}>{edu.degree}</h3>
                    <p className={styles.institution}>{edu.institution}</p>
                  </div>
                  <div className={styles.period}>
                    <FiCalendar size={14} />
                    <span>{edu.period}</span>
                  </div>
                </div>
                <p className={styles.description}>{edu.description}</p>
                <div className={styles.achievements}>
                  {edu.achievements.map((a) => (
                    <span key={a} className={styles.achievementTag}>
                      <FiAward size={12} />
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
