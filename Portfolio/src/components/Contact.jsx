import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import styles from '../styles/Contact.module.css'

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'souravshukla5166@gmail.com', href: 'mailto:souravshukla5166@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 XXXXX XXXXX', href: 'tel:+91' },
  { icon: <FiMapPin />, label: 'Location', value: 'Punjab, India', href: null },
]

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/anshshukla001', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/in/ansh-shukla001', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: 'https://twitter.com', label: 'Twitter' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://formspree.io/f/mqpklvkk', {
        method: 'POST',
        body: new FormData(formRef.current),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      } else {
        const data = await response.json()
        setError(data?.errors?.map((e) => e.message).join(', ') || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
        >
          <p className="section-subtitle">
            <FiMail className="icon" />
            Contact
          </p>
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-description">
            Feel free to reach out for collaborations, opportunities, or just a friendly chat
          </p>
        </motion.div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <motion.div
            className={styles.info}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.1}
          >
            <h3 className={styles.infoTitle}>Let's talk about everything!</h3>
            <p className={styles.infoText}>
              Don't like forms? Send me an email or reach out on social media.
              I'm always open to discussing new projects and ideas.
            </p>

            <div className={styles.contactItems}>
              {contactInfo.map((item) => (
                <div key={item.label} className={styles.contactItem}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div>
                    <p className={styles.contactLabel}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className={styles.contactValue}>{item.value}</a>
                    ) : (
                      <p className={styles.contactValue}>{item.value}</p>
                    )}
                  </div>
                </div>
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
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className={styles.form}
            onSubmit={handleSubmit}
            ref={formRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0.2}
          >
            {error && (
              <p style={{ color: '#ef4444', fontSize: '14px', margin: 0 }}>{error}</p>
            )}

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {submitting ? (
                <>Sending...</>
              ) : submitted ? (
                <>✓ Message Sent!</>
              ) : (
                <>
                  <FiSend size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
