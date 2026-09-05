import { motion } from 'framer-motion'
import { FiUser, FiCode, FiTarget, FiLayers } from 'react-icons/fi'
import styles from '../styles/About.module.css'

const stats = [
  { number: '10+', label: 'Projects Completed' },
  { number: '5+', label: 'Technologies' },
  { number: '1+', label: 'Years Experience' },
  { number: '100%', label: 'Dedication' },
]

const highlights = [
  { icon: <FiCode />, title: 'Clean Code', desc: 'Writing maintainable, scalable code' },
  { icon: <FiTarget />, title: 'Problem Solver', desc: 'Breaking down complex challenges' },
  { icon: <FiLayers />, title: 'Full-Stack', desc: 'End-to-end development expertise' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <p className="section-subtitle">
            <FiUser className="icon" />
            About Me
          </p>
          <h2 className="section-title">
            Passionate <span className="gradient-text">Full-Stack Developer</span>
          </h2>
        </motion.div>

        <div className={styles.grid}>
          <motion.div
            className={styles.aboutText}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            custom={0.2}
          >
            <p>
              I'm a dedicated developer who loves creating web applications that
              combine functionality with great design. With experience across the
              full stack, I build everything from responsive frontends to robust
              backend systems.
            </p>
            <p>
              My journey in tech started with curiosity and has grown into a deep
              passion for building applications that solve real problems. I'm
              constantly learning new technologies and best practices to stay at
              the forefront of web development.
            </p>

            <div className={styles.highlights}>
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  className={styles.highlightItem}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i * 0.15 + 0.3}
                >
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <div>
                    <strong>{h.title}</strong>
                    <p>{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i * 0.1 + 0.2}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <span className={styles.statNumber}>{stat.number}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
