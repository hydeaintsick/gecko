"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface ButterflyProps {
  size?: number
  color?: string
  delay?: number
  duration?: number
  top?: string
  left?: string
  right?: string
  zIndex?: number
}

export function Butterfly({
  size = 20,
  color = "#F472B6", // Default pink
  delay = 0,
  duration = 15,
  top,
  left,
  right,
  zIndex = 10,
}: ButterflyProps) {
  const [randomPath, setRandomPath] = useState<string>("")
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 })

  // Generate a random path for the butterfly to follow
  useEffect(() => {
    // Create random control points for a bezier curve
    const cp1x = Math.random() * 100
    const cp1y = Math.random() * 100 - 50
    const cp2x = Math.random() * 100 + 100
    const cp2y = Math.random() * 100 - 50

    // Set random start and end positions
    const startX = left ? -size : right ? window.innerWidth : Math.random() * window.innerWidth
    const startY = top || (Math.random() * window.innerHeight) / 2
    const endX = right ? window.innerWidth + size : Math.random() * window.innerWidth
    const endY = (Math.random() * window.innerHeight) / 2

    setStartPosition({ x: startX, y: Number.parseFloat(startY as any) })
    setEndPosition({ x: endX, y: endY })

    // Create the path
    setRandomPath(`M ${startX},${startY} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`)
  }, [size, left, right, top])

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: top || startPosition.y,
        left: left || startPosition.x,
        right: right,
        zIndex,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        pathOffset: [0, 1],
        x: [0, endPosition.x - startPosition.x],
        y: [0, endPosition.y - startPosition.y],
      }}
      transition={{
        duration,
        delay,
        times: [0, 0.1, 0.9, 1],
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 5,
      }}
    >
      <motion.div
        animate={{ rotateY: [0, 180, 0] }}
        transition={{
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left wing */}
          <motion.path
            d="M12 12C8 8 2 9 2 14C2 19 12 22 12 12Z"
            fill={color}
            animate={{
              d: [
                "M12 12C8 8 2 9 2 14C2 19 12 22 12 12Z",
                "M12 12C10 10 6 10 4 13C2 16 12 18 12 12Z",
                "M12 12C8 8 2 9 2 14C2 19 12 22 12 12Z",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          {/* Right wing */}
          <motion.path
            d="M12 12C16 8 22 9 22 14C22 19 12 22 12 12Z"
            fill={color}
            animate={{
              d: [
                "M12 12C16 8 22 9 22 14C22 19 12 22 12 12Z",
                "M12 12C14 10 18 10 20 13C22 16 12 18 12 12Z",
                "M12 12C16 8 22 9 22 14C22 19 12 22 12 12Z",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          {/* Body */}
          <path d="M12 8C12 8 13 10 13 12C13 14 12 16 12 16C12 16 11 14 11 12C11 10 12 8 12 8Z" fill="#000" />

          {/* Antennae */}
          <path d="M11 8C11 8 10 6 9 5" stroke="#000" strokeWidth="0.5" />
          <path d="M13 8C13 8 14 6 15 5" stroke="#000" strokeWidth="0.5" />
          <circle cx="9" cy="5" r="0.5" fill="#000" />
          <circle cx="15" cy="5" r="0.5" fill="#000" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export function ButterflySwarm({ count = 5 }) {
  const colors = ["#F472B6", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA"]

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Butterfly
          key={i}
          size={15 + Math.random() * 15}
          color={colors[Math.floor(Math.random() * colors.length)]}
          delay={i * 2}
          duration={10 + Math.random() * 15}
        />
      ))}
    </>
  )
}

