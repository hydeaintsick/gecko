"use client"

import { useRef } from "react"
import { motion, useTransform } from "framer-motion"

export function AnimatedGecko({ progress }) {
  const pathRef = useRef(null)
  const geckoRef = useRef(null)

  // Transform the progress (0-100) to x,y coordinates along the path
  const x = useTransform(progress, [0, 100], [10, 90]) // percentage across SVG width
  const y = useTransform(progress, [0, 25, 50, 75, 100], [0, 300, 300, 600, 800]) // custom y positions based on the path

  // Rotate the gecko based on the direction it's moving
  const rotate = useTransform(progress, [0, 25, 50, 75, 100], [0, 30, -30, 30, 0])

  // Scale the gecko for a bouncy effect
  const scale = useTransform(progress, [0, 25, 50, 75, 100], [1, 1.1, 1, 1.1, 1])

  // Gecko's eye blink animation
  const eyeScale = useTransform(
    progress,
    // Blink at specific points
    [10, 10.1, 10.2, 40, 40.1, 40.2, 70, 70.1, 70.2, 90, 90.1, 90.2],
    [1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1, 1, 0.1, 1],
  )

  return (
    <motion.div
      ref={geckoRef}
      style={{
        position: "absolute",
        left: `${x.get()}%`,
        top: y,
        rotate,
        scale,
        width: "60px",
        height: "60px",
        transformOrigin: "center",
      }}
    >
      <div className="relative w-full h-full">
        {/* Gecko body */}
        <motion.div
          animate={{
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Gecko body */}
            <path
              d="M30,50 Q40,30 60,35 Q80,40 75,60 Q70,80 50,75 Q30,70 30,50 Z"
              fill="#4ade80"
              stroke="#16a34a"
              strokeWidth="2"
            />

            {/* Gecko tail */}
            <motion.path
              animate={{
                d: [
                  "M30,50 Q20,60 15,50 Q10,40 5,45",
                  "M30,50 Q20,40 15,45 Q10,50 5,40",
                  "M30,50 Q20,60 15,50 Q10,40 5,45",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              fill="#4ade80"
              stroke="#16a34a"
              strokeWidth="2"
            />

            {/* Gecko head */}
            <ellipse cx="70" cy="40" rx="15" ry="10" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />

            {/* Gecko eye */}
            <motion.circle cx="75" cy="37" r="3" fill="black" style={{ scaleY: eyeScale }} />

            {/* Gecko legs */}
            <path d="M40,70 Q35,80 30,85" stroke="#16a34a" strokeWidth="2" fill="none" />
            <path d="M60,75 Q65,85 70,90" stroke="#16a34a" strokeWidth="2" fill="none" />
            <path d="M65,40 Q75,30 85,35" stroke="#16a34a" strokeWidth="2" fill="none" />
            <path d="M45,35 Q35,25 25,30" stroke="#16a34a" strokeWidth="2" fill="none" />
          </svg>
        </motion.div>

        {/* Thought bubble that appears occasionally */}
        <motion.div
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.5, 0.5, 1, 1, 0.5],
            y: [0, 0, -20, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            times: [0, 0.3, 0.4, 0.9, 1],
          }}
          className="absolute -top-12 -right-8"
        >
          <div className="relative">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M5,20 A15,15 0 1,1 35,20 A15,15 0 1,1 5,20 Z" fill="white" stroke="#16a34a" strokeWidth="1" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm">🌱</span>
            </div>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute -bottom-2 left-2">
            <circle cx="5" cy="5" r="5" fill="white" stroke="#16a34a" strokeWidth="1" />
          </svg>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="absolute -bottom-6 left-0">
            <circle cx="5" cy="5" r="4" fill="white" stroke="#16a34a" strokeWidth="1" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}

