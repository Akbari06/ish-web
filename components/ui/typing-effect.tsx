'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) { return twMerge(clsx(inputs)) }

interface TypingEffectProps {
  texts?: string[]
  className?: string
  rotationInterval?: number
  typingSpeed?: number
  delay?: number
  block?: boolean
  active?: boolean
  onDone?: () => void
}

const DEMO = ['Design', 'Development', 'Marketing']

export const TypingEffect = ({
  texts = DEMO,
  className,
  rotationInterval = 3000,
  typingSpeed = 150,
  delay = 0,
  block = false,
  active,
  onDone,
}: TypingEffectProps) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })
  const doneCalled = useRef(false)

  const currentText = texts[currentTextIndex % texts.length]

  // Start via active prop (chained mode) or via isInView+delay (standalone mode)
  useEffect(() => {
    if (active !== undefined) {
      if (active) setStarted(true)
    } else {
      if (!isInView) return
      const t = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(t)
    }
  }, [isInView, active])

  // Typing logic
  useEffect(() => {
    if (!started) return
    if (charIndex < currentText.length) {
      const t = setTimeout(() => {
        setDisplayedText(prev => prev + currentText.charAt(charIndex))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
      return () => clearTimeout(t)
    } else {
      if (!doneCalled.current) {
        doneCalled.current = true
        onDone?.()
      }
      const t = setTimeout(() => {
        setDisplayedText('')
        setCharIndex(0)
        setCurrentTextIndex(prev => (prev + 1) % texts.length)
      }, rotationInterval)
      return () => clearTimeout(t)
    }
  }, [charIndex, currentText, started])

  const showCursor = started && (block ? charIndex < currentText.length : true)

  const cursor = showCursor ? (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      className={block
        ? 'inline-block ml-0.5 h-[0.85em] w-[2px] rounded-sm bg-current align-middle'
        : 'ml-1 h-[1em] w-1 rounded-sm bg-current'
      }
    />
  ) : null

  if (block) {
    return (
      <div ref={containerRef} className={cn(className)}>
        {displayedText}{cursor}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center justify-center text-center text-4xl font-bold',
        className
      )}
    >
      {displayedText}
      {cursor}
    </div>
  )
}

export default TypingEffect
