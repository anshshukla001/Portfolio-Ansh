import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import styles from '../styles/Footer.module.css'

const footerLinks = [
  { name: 'Home', to: 'hero' },
  { name: 'About', to: 'about' },
  { name: 'Projects', to: 'projects' },
  { name: 'Contact', to: 'contact' },
]

const socials = [
  { icon: <FiGithub />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
]

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
              &lt;Ansh /&gt;
            </a>
            <p className={styles.tagline}>Building digital experiences with passion and precision.</p>
          </div>

          <div className={styles.links}>
            {footerLinks.map((link) => (
              <button key={link.to} className={styles.link} onClick={() => scrollTo(link.to)}>
                {link.name}
              </button>
            ))}
          </div>

          <div className={styles.socialLinks}>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p>
            © {new Date().getFullYear()} Ansh. All rights reserved. Built with{' '}
            <FiHeart className={styles.heart} /> using React.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
