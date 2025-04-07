"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function CaterpillarTransformation() {
  const [stage, setStage] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Progress through the transformation stages
  useEffect(() => {
    if (animationComplete) return

    const timer = setTimeout(() => {
      if (stage < 4) {
        setStage((prev) => prev + 1)
      } else {
        setAnimationComplete(true)
        // Reset after a longer pause
        setTimeout(() => {
          setStage(0)
          setAnimationComplete(false)
        }, 3000)
      }
    }, 4000) // Each stage lasts 4 seconds

    return () => clearTimeout(timer)
  }, [stage, animationComplete])

  return (
    <div className="relative w-60 h-60">
      {/* Leaf/Plant - present in all stages */}
      <motion.svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-10 left-0">
        <motion.path
          d="M20,50 Q40,20 60,50 T100,50"
          stroke="#16a34a"
          strokeWidth="4"
          fill="#4ade80"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1,
            d: stage >= 1 ? "M20,50 Q40,20 40,50 T80,50" : "M20,50 Q40,20 60,50 T100,50",
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            d: { duration: 4, ease: "easeInOut" },
          }}
        />
        <motion.path
          d="M20,50 L20,70"
          stroke="#16a34a"
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        />
      </motion.svg>

      {/* Stage 0-1: Caterpillar eating leaf */}
      {(stage === 0 || stage === 1) && (
        <motion.div
          className="absolute top-20 left-10"
          animate={{
            x: stage === 0 ? [0, 30] : [30, 40],
            opacity: stage === 1 && animationComplete ? 0 : 1,
          }}
          transition={{
            x: { duration: 4, ease: "easeInOut" },
            opacity: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <motion.svg width="60" height="30" viewBox="0 0 60 30">
            {/* Caterpillar body segments */}
            <motion.g
              animate={{
                x: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <circle cx="10" cy="15" r="8" fill="#A3E635" />
              <motion.circle
                cx="22"
                cy="15"
                r="8"
                fill="#A3E635"
                animate={{ y: [0, -2, 0, 2, 0] }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.circle
                cx="34"
                cy="15"
                r="8"
                fill="#A3E635"
                animate={{ y: [0, -2, 0, 2, 0] }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
              <motion.circle
                cx="46"
                cy="15"
                r="8"
                fill="#A3E635"
                animate={{ y: [0, -2, 0, 2, 0] }}
                transition={{
                  duration: 0.5,
                  delay: 0.3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Face */}
              <circle cx="10" cy="12" r="1.5" fill="black" />
              <circle cx="10" cy="18" r="1.5" fill="black" />

              {/* Mouth - eating animation */}
              <motion.path
                d="M5,15 Q7,17 10,15"
                stroke="black"
                strokeWidth="1"
                fill="none"
                animate={{
                  d: ["M5,15 Q7,17 10,15", "M5,15 Q7,13 10,15", "M5,15 Q7,17 10,15"],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Antennae */}
              <motion.path
                d="M10,7 Q8,4 6,3"
                stroke="black"
                strokeWidth="1"
                fill="none"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ transformOrigin: "10px 7px" }}
              />
              <motion.path
                d="M10,7 Q12,4 14,3"
                stroke="black"
                strokeWidth="1"
                fill="none"
                animate={{ rotate: [0, -10, 0, 10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                style={{ transformOrigin: "10px 7px" }}
              />
            </motion.g>
          </motion.svg>
        </motion.div>
      )}

      {/* Stage 2: Cocoon forming */}
      {stage === 2 && (
        <motion.div
          className="absolute top-20 left-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg width="40" height="60" viewBox="0 0 40 60">
            <motion.path
              d="M20,10 Q30,20 20,50 Q10,20 20,10"
              initial={{ pathLength: 0, fill: "rgba(226, 232, 240, 0)" }}
              animate={{
                pathLength: 1,
                fill: "rgba(226, 232, 240, 1)",
              }}
              transition={{
                pathLength: { duration: 2 },
                fill: { duration: 2, delay: 1 },
              }}
              stroke="#94A3B8"
              strokeWidth="2"
            />

            {/* Subtle movement */}
            <motion.circle
              cx="20"
              cy="30"
              r="15"
              fill="transparent"
              animate={{
                scale: [1, 1.05, 1, 0.95, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Stage 3: Butterfly emerging with hearts */}
      {stage === 3 && (
        <motion.div
          className="absolute top-20 left-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg width="60" height="60" viewBox="0 0 60 60">
            {/* Cocoon opening */}
            <motion.path
              d="M20,10 Q30,20 20,50 Q10,20 20,10"
              initial={{ fill: "rgba(226, 232, 240, 1)" }}
              animate={{
                d: "M15,10 Q5,20 15,50 Q25,20 15,10",
                fill: "rgba(226, 232, 240, 0.5)",
              }}
              transition={{ duration: 2 }}
              stroke="#94A3B8"
              strokeWidth="2"
            />

            {/* Butterfly emerging */}
            <motion.g
              initial={{ scale: 0.5, x: -10 }}
              animate={{
                scale: 1,
                x: 10,
                y: [-5, -15, -25],
              }}
              transition={{
                scale: { duration: 1 },
                x: { duration: 1 },
                y: { duration: 3, times: [0, 0.7, 1] },
              }}
            >
              {/* Left wing */}
              <motion.path
                d="M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30"
                fill="#F472B6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  d: [
                    "M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30",
                    "M30,30 C28,28 24,28 22,31 C20,34 30,36 30,30",
                    "M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30",
                  ],
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  d: {
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  },
                }}
              />

              {/* Right wing */}
              <motion.path
                d="M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30"
                fill="#F472B6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  d: [
                    "M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30",
                    "M30,30 C32,28 36,28 38,31 C40,34 30,36 30,30",
                    "M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30",
                  ],
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  d: {
                    duration: 0.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  },
                }}
              />

              {/* Body */}
              <motion.path
                d="M30,26 C30,26 31,28 31,30 C31,32 30,34 30,34 C30,34 29,32 29,30 C29,28 30,26 30,26"
                fill="#000"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />

              {/* Antennae */}
              <motion.path
                d="M29,26 C29,26 28,24 27,23"
                stroke="#000"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.path
                d="M31,26 C31,26 32,24 33,23"
                stroke="#000"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
              <motion.circle cx="27" cy="23" r="0.5" fill="#000" />
              <motion.circle cx="33" cy="23" r="0.5" fill="#000" />
            </motion.g>

            {/* Hearts */}
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${35 + i * 3},${25 + i * 3} C${33 + i * 3},${20 + i * 3} ${27 + i * 3},${20 + i * 3} ${27 + i * 3},${25 + i * 3} C${27 + i * 3},${30 + i * 3} ${35 + i * 3},${35 + i * 3} ${35 + i * 3},${35 + i * 3} C${35 + i * 3},${35 + i * 3} ${43 + i * 3},${30 + i * 3} ${43 + i * 3},${25 + i * 3} C${43 + i * 3},${20 + i * 3} ${37 + i * 3},${20 + i * 3} ${35 + i * 3},${25 + i * 3}`}
                fill="#F87171"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 0],
                  y: [0, -10 - i * 3],
                  x: [0, i % 2 === 0 ? 5 : -5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: 1,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </motion.svg>
        </motion.div>
      )}

      {/* Stage 4: Gorilla catching butterfly */}
      {stage === 4 && (
        <motion.div
          className="absolute top-0 left-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.svg width="120" height="120" viewBox="0 0 120 120">
            {/* Gorilla sitting */}
            <motion.g initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
              {/* Body */}
              <motion.ellipse cx="60" cy="80" rx="25" ry="20" fill="#4B5563" />

              {/* Head */}
              <motion.circle cx="60" cy="45" r="18" fill="#4B5563" />

              {/* Face */}
              <motion.circle cx="60" cy="45" r="12" fill="#9CA3AF" />

              {/* Eyes */}
              <motion.circle cx="54" cy="40" r="2.5" fill="black" />
              <motion.circle cx="66" cy="40" r="2.5" fill="black" />

              {/* Nose */}
              <motion.path d="M57,45 Q60,48 63,45" stroke="black" strokeWidth="1.5" fill="none" />

              {/* Mouth */}
              <motion.path d="M55,50 Q60,53 65,50" stroke="black" strokeWidth="1" fill="none" />

              {/* Ears */}
              <motion.circle cx="45" cy="38" r="5" fill="#4B5563" />
              <motion.circle cx="75" cy="38" r="5" />
              <motion.circle cx="75" cy="38" r="5" fill="#4B5563" />

              {/* Arms */}
              <motion.path
                d="M40,70 Q30,60 35,50"
                stroke="#4B5563"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />

              {/* Right arm - will move to catch butterfly */}
              <motion.path
                d="M80,70 Q90,60 85,50"
                stroke="#4B5563"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                initial={{ d: "M80,70 Q90,60 85,50" }}
                animate={{
                  d: ["M80,70 Q90,60 85,50", "M80,70 Q90,50 85,30", "M80,70 Q85,45 75,30", "M80,70 Q75,50 65,40"],
                }}
                transition={{
                  duration: 3,
                  times: [0, 0.3, 0.6, 1],
                }}
              />

              {/* Legs */}
              <motion.path
                d="M50,95 Q45,105 40,110"
                stroke="#4B5563"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
              <motion.path
                d="M70,95 Q75,105 80,110"
                stroke="#4B5563"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Butterfly that will be caught */}
            <motion.g
              initial={{ x: -40, y: -60 }}
              animate={{
                x: [-40, -20, 0, 20, 40, 60, 65],
                y: [-60, -50, -40, -30, -40, -50, -40],
                scale: [1, 1, 1, 1, 1, 1, 0.8],
              }}
              transition={{
                duration: 3,
                times: [0, 0.2, 0.4, 0.6, 0.7, 0.9, 1],
              }}
            >
              {/* Left wing */}
              <motion.path
                d="M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30"
                fill="#F472B6"
                animate={{
                  d: [
                    "M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30",
                    "M30,30 C28,28 24,28 22,31 C20,34 30,36 30,30",
                    "M30,30 C26,26 20,27 20,32 C20,37 30,40 30,30",
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
                d="M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30"
                fill="#F472B6"
                animate={{
                  d: [
                    "M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30",
                    "M30,30 C32,28 36,28 38,31 C40,34 30,36 30,30",
                    "M30,30 C34,26 40,27 40,32 C40,37 30,40 30,30",
                  ],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Body */}
              <path
                d="M30,26 C30,26 31,28 31,30 C31,32 30,34 30,34 C30,34 29,32 29,30 C29,28 30,26 30,26"
                fill="#000"
              />

              {/* Antennae */}
              <path d="M29,26 C29,26 28,24 27,23" stroke="#000" strokeWidth="0.5" />
              <path d="M31,26 C31,26 32,24 33,23" stroke="#000" strokeWidth="0.5" />
              <circle cx="27" cy="23" r="0.5" fill="#000" />
              <circle cx="33" cy="23" r="0.5" fill="#000" />
            </motion.g>

            {/* Hearts appearing when gorilla catches butterfly */}
            {[...Array(5)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${65 + i * 3},${40 + i * 3} C${63 + i * 3},${35 + i * 3} ${57 + i * 3},${35 + i * 3} ${57 + i * 3},${40 + i * 3} C${57 + i * 3},${45 + i * 3} ${65 + i * 3},${50 + i * 3} ${65 + i * 3},${50 + i * 3} C${65 + i * 3},${50 + i * 3} ${73 + i * 3},${45 + i * 3} ${73 + i * 3},${40 + i * 3} C${73 + i * 3},${35 + i * 3} ${67 + i * 3},${35 + i * 3} ${65 + i * 3},${40 + i * 3}`}
                fill="#F87171"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  opacity: [0, 1, 0],
                  y: [0, -10 - i * 3],
                  x: [0, i % 2 === 0 ? 5 : -5],
                }}
                transition={{
                  duration: 2,
                  delay: 2 + i * 0.2,
                  repeat: 1,
                  repeatDelay: 0.5,
                }}
              />
            ))}

            {/* Gorilla's smile after catching butterfly */}
            <motion.path
              d="M55,50 Q60,53 65,50"
              stroke="black"
              strokeWidth="1"
              fill="none"
              initial={{ d: "M55,50 Q60,53 65,50" }}
              animate={{
                d: "M55,52 Q60,56 65,52",
              }}
              transition={{
                delay: 2.5,
                duration: 0.5,
              }}
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  )
}

