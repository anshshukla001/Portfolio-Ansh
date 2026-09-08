import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiDownload, FiMapPin } from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi'
import { useTypingEffect } from '../hooks/useTypingEffect'
import HeroTerminal from './HeroTerminal'
import styles from '../styles/Hero.module.css'

export default function Hero() {
  const { displayedText, isComplete } = useTypingEffect(
    'Full-Stack Developer & Creative Problem Solver',
    50, // typing speed in ms
    800 // delay before starting (after title animation)
  )

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <HiOutlineSparkles className={styles.badgeIcon} />
            <span className={styles.badgeText}>Available for opportunities</span>
          </motion.div>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hey, I'm <span className="gradient-text">Ansh</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className={styles.subtitleCode}></span>
            {displayedText}
            <span className={`${styles.subtitleCode} ${!isComplete ? styles.cursor : ''}`}></span>
          </motion.p>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I build modern web applications with clean code and beautiful interfaces.
            Passionate about creating digital experiences that make a difference.
          </motion.p>

          <motion.div
            className={styles.location}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <FiMapPin size={14} />
            <span>India</span>
          </motion.div>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href="#contact" className={styles.primaryBtn} onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Get in Touch
            </a>
            <a href="#" className={styles.secondaryBtn}>
              <FiDownload size={16} />
              Resume
            </a>
          </motion.div>

          <motion.div
            className={styles.socials}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a href="https://github.com/anshshukla001" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/ansh-shukla001" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <FiLinkedin size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          className={styles.terminalWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <HeroTerminal
            username="ansh@portfolio"
            typingSpeed={45}
            delayBetweenCommands={1000}
            commands={[
              'cat about.txt',
              'ls skills/',
              'git log --oneline -3',
              'echo "Let\'s build something awesome!"',
            ]}
            outputs={{
              0: [
                '📍 Location: Punjab, India',
                '🎓 B.E. Computer Science — Chitkara University',
                '💻 Passionate full-stack developer',
                '🚀 Building modern web experiences',
              ],
              1: [
                'react.js    java        .Net        c#',
                'javascript  typescript  python      mongodb',
                'tailwind    SQL         git         docker',
              ],
              2: [
                'a1b2c3d  feat: add AI thief detection system',
                'e4f5g6h  feat: build crypto dashboard app',
                '7i8j9k0  feat: launch portfolio website',
              ],
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}

