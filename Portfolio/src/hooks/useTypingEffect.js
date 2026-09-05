import { useState, useEffect } from 'react'

export function useTypingEffect(text, speed = 100, delay = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let timeout
    let index = 0

    const startTyping = () => {
      if (index < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, index + 1))
          index++
          startTyping()
        }, speed)
      } else {
        setIsComplete(true)
      }
    }

    const delayTimeout = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(timeout)
      clearTimeout(delayTimeout)
    }
  }, [text, speed, delay])

  return { displayedText, isComplete }
}
