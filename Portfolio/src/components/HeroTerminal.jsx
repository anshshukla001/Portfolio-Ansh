import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/HeroTerminal.module.css'

/* ── Bash-style syntax highlighting ──────────────────────── */

const TOKEN_TYPES = {
  command: 'command',
  flag: 'flag',
  string: 'string',
  number: 'number',
  operator: 'operator',
  path: 'path',
  variable: 'variable',
  comment: 'comment',
  default: 'default',
}

function tokenizeBash(text) {
  const tokens = []
  const words = text.split(/(\s+)/)
  let isFirstWord = true

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: TOKEN_TYPES.default, value: word })
      continue
    }
    if (word.startsWith('#')) {
      tokens.push({ type: TOKEN_TYPES.comment, value: word })
      continue
    }
    if (word.startsWith('$')) {
      tokens.push({ type: TOKEN_TYPES.variable, value: word })
      isFirstWord = false
      continue
    }
    if (word.startsWith('--') || word.startsWith('-')) {
      tokens.push({ type: TOKEN_TYPES.flag, value: word })
      isFirstWord = false
      continue
    }
    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: TOKEN_TYPES.string, value: word })
      isFirstWord = false
      continue
    }
    if (/^\d+$/.test(word)) {
      tokens.push({ type: TOKEN_TYPES.number, value: word })
      isFirstWord = false
      continue
    }
    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: TOKEN_TYPES.operator, value: word })
      isFirstWord = true
      continue
    }
    if (word.includes('/') || word.startsWith('.') || word.startsWith('~')) {
      tokens.push({ type: TOKEN_TYPES.path, value: word })
      isFirstWord = false
      continue
    }
    if (isFirstWord) {
      tokens.push({ type: TOKEN_TYPES.command, value: word })
      isFirstWord = false
      continue
    }
    tokens.push({ type: TOKEN_TYPES.default, value: word })
  }
  return tokens
}

function SyntaxHighlightedText({ text }) {
  const tokens = tokenizeBash(text)
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={styles[`token_${token.type}`]}>
          {token.value}
        </span>
      ))}
    </>
  )
}

/* ── Intersection Observer hook ──────────────────────────── */

function useInView(ref, once = true) {
  const [inView, setInView] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || (once && triggered.current)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          setInView(true)
          if (once) {
            triggered.current = true
            observer.disconnect()
          }
        }
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, once])

  return inView
}

/* ── Main Terminal Component ─────────────────────────────── */

export default function HeroTerminal({
  commands = ['echo "Hello World"'],
  outputs = {},
  username = 'ansh@portfolio',
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
  noTopRadius = false,
}) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const inView = useInView(containerRef)

  const [lines, setLines] = useState([])
  const [currentText, setCurrentText] = useState('')
  const [commandIdx, setCommandIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [outputIdx, setOutputIdx] = useState(-1)
  const [phase, setPhase] = useState('idle')
  const [cursorVisible, setCursorVisible] = useState(true)

  const currentCommand = commands[commandIdx] || ''
  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx],
  )
  const isLastCommand = commandIdx === commands.length - 1

  // Start typing when in view
  useEffect(() => {
    if (!inView || phase !== 'idle') return
    const t = setTimeout(() => setPhase('typing'), initialDelay)
    return () => clearTimeout(t)
  }, [inView, phase, initialDelay])

  // Typing phase — type one char at a time
  useEffect(() => {
    if (phase !== 'typing') return

    if (charIdx < currentCommand.length) {
      const t = setTimeout(
        () => {
          setCurrentText(currentCommand.slice(0, charIdx + 1))
          setCharIdx((c) => c + 1)
        },
        typingSpeed + Math.random() * 30,
      )
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setPhase('executing'), 80)
      return () => clearTimeout(t)
    }
  }, [phase, charIdx, currentCommand, typingSpeed])

  // Executing phase — commit command line, start output
  useEffect(() => {
    if (phase !== 'executing') return

    setLines((prev) => [...prev, { type: 'command', content: currentCommand }])
    setCurrentText('')

    if (currentOutputs.length > 0) {
      setOutputIdx(0)
      setPhase('outputting')
    } else if (isLastCommand) {
      setPhase('done')
    } else {
      setPhase('pausing')
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand])

  // Outputting phase — print output lines one by one
  useEffect(() => {
    if (phase !== 'outputting') return

    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: 'output', content: currentOutputs[outputIdx] },
        ])
        setOutputIdx((i) => i + 1)
      }, 150)
      return () => clearTimeout(t)
    } else if (outputIdx >= currentOutputs.length) {
      const t = setTimeout(() => {
        if (isLastCommand) setPhase('done')
        else setPhase('pausing')
      }, 300)
      return () => clearTimeout(t)
    }
  }, [phase, outputIdx, currentOutputs, isLastCommand])

  // Pausing phase — wait then move to next command
  useEffect(() => {
    if (phase !== 'pausing') return
    const t = setTimeout(() => {
      setCharIdx(0)
      setOutputIdx(-1)
      setCommandIdx((c) => c + 1)
      setPhase('typing')
    }, delayBetweenCommands)
    return () => clearTimeout(t)
  }, [phase, delayBetweenCommands])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [lines, phase])

  const prompt = (
    <span className={styles.prompt}>
      <span className={styles.promptUser}>{username}</span>
      <span className={styles.promptSep}>:</span>
      <span className={styles.promptDir}>~</span>
      <span className={styles.promptDollar}>$</span>{' '}
    </span>
  )

  return (
    <div ref={containerRef} className={styles.terminal}>
      <div
        className={styles.window}
        style={noTopRadius ? { borderRadius: `0 0 var(--radius-lg) var(--radius-lg)` } : undefined}
      >
        {/* Title bar */}
        <div className={styles.titleBar}>
          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <div className={styles.titleText}>
            {username} — bash
          </div>
          <div className={styles.titleSpacer} />
        </div>

        {/* Content */}
        <div ref={contentRef} className={styles.content}>
          {lines.map((line, i) => (
            <div key={i} className={styles.line}>
              {line.type === 'command' ? (
                <span>
                  {prompt}
                  <SyntaxHighlightedText text={line.content} />
                </span>
              ) : (
                <span className={styles.outputText}>{line.content}</span>
              )}
            </div>
          ))}

          {phase === 'typing' && (
            <div className={styles.line}>
              {prompt}
              <SyntaxHighlightedText text={currentText} />
              <span className={styles.cursorBlock} />
            </div>
          )}

          {(phase === 'done' || phase === 'pausing' || phase === 'outputting') && (
            <div className={styles.line}>
              {prompt}
              <span
                className={`${styles.cursorBlock} ${
                  !cursorVisible ? styles.cursorHidden : ''
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
