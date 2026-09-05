import { motion } from 'framer-motion'
import { FiCpu } from 'react-icons/fi'
import {
  SiReact, SiJavascript, SiTypescript, SiNodedotjs, SiMongodb,
  SiPython, SiGit, SiDocker, SiTailwindcss,
  SiExpress, SiMysql, SiFirebase, SiHtml5, SiDotnet
} from 'react-icons/si'
import { FaCss3Alt, FaJava } from 'react-icons/fa'
import { TbBrandCSharp } from 'react-icons/tb'
import styles from '../styles/Skills.module.css'

const skills = [
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
  { name: 'C#', icon: <TbBrandCSharp />, color: '#239120' },
  { name: 'Java', icon: <FaJava />, color: '#007396' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
  { name: 'Python', icon: <SiPython />, color: '#3776AB' },
  { name: 'Express', icon: <SiExpress />, color: '#ffffff' },
  { name: '.NET', icon: <SiDotnet />, color: '#512BD4' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
  { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Skills() {
  // Duplicate the list for seamless infinite scroll
  const doubledSkills = [...skills, ...skills]

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <p className="section-subtitle">
            <FiCpu className="icon" />
            Skills
          </p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-description">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>
      </div>

      <motion.div
        className={styles.carouselWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={fadeUp}
      >
        <div className={styles.carousel}>
          <div className={styles.track}>
            {doubledSkills.map((skill, i) => (
              <div
                key={`${skill.name}-${i}`}
                className={styles.skillCard}
              >
                <span
                  className={styles.skillIcon}
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reverse direction row */}
        <div className={styles.carousel}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            {[...doubledSkills].reverse().map((skill, i) => (
              <div
                key={`${skill.name}-rev-${i}`}
                className={styles.skillCard}
              >
                <span
                  className={styles.skillIcon}
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
