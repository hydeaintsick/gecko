"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Droplets, Sun, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedGecko } from "@/components/animated-gecko"
import { Butterfly, ButterflySwarm } from "@/components/butterfly"
import { CaterpillarTransformation } from "@/components/caterpillar-transformation"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const geckoPathProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.95, 0.9])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 overflow-hidden"
    >
      {/* Reduced butterflies throughout the page */}
      <ButterflySwarm count={4} />

      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-md"
        >
          <div className="inline-block mb-4 relative">
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="relative"
            >
              <span className="text-7xl">🦎</span>
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: 1,
                }}
                className="absolute -top-6 right-0"
              >
                <span className="text-2xl">💭</span>
                <span className="absolute top-1 right-3 text-sm">🌱</span>
              </motion.div>
            </motion.div>
          </div>

          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Meet Gecko
          </h1>

          {/* Centered caterpillar transformation animation */}
          <div className="flex justify-center my-6 h-32 overflow-visible">
            <div className="scale-75 md:scale-90 transform-gpu">
              <CaterpillarTransformation />
            </div>
          </div>

          <p className="text-xl mb-6 text-muted-foreground">
            Your adorable plant companion that helps you nurture your green friends 🌿
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="rounded-full px-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="rounded-full px-6">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Floating plants */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <span className="text-4xl">🌵</span>
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          <span className="text-4xl">🌱</span>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          <span className="text-4xl">🪴</span>
        </motion.div>

        {/* Additional butterflies near the title - reduced to just 2 */}
        <Butterfly size={25} color="#F472B6" top="30%" left="15%" delay={2} duration={12} />
        <Butterfly size={20} color="#60A5FA" top="25%" right="15%" delay={4} duration={15} />
      </motion.section>

      {/* Gecko path - this is the path the gecko will follow */}
      <div className="relative">
        <div className="absolute left-0 right-0 h-full">
          <svg className="w-full h-full" viewBox="0 0 100 800" fill="none" preserveAspectRatio="none">
            <path
              d="M10,0 C30,100 70,200 30,300 C-10,400 90,500 50,600 C10,700 50,800 90,800"
              stroke="#E0F2E9"
              strokeWidth="4"
              strokeDasharray="5,5"
              fill="none"
            />
          </svg>

          {/* Animated gecko that follows the path */}
          <AnimatedGecko progress={geckoPathProgress} />
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Why You'll Love Gecko
            </h2>
            <p className="text-muted-foreground">Your plants deserve the best care, and Gecko is here to help!</p>
          </motion.div>

          <div className="grid gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="bg-green-100 p-3 rounded-full">
                <Droplets className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Water Tracking</h3>
                <p className="text-muted-foreground">
                  Never forget to water your plants again. Gecko reminds you when each plant needs attention.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="bg-yellow-100 p-3 rounded-full">
                <Sun className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Light Requirements</h3>
                <p className="text-muted-foreground">
                  Track sunlight needs for each plant and get reminders to rotate them for even growth.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Plant Journal</h3>
                <p className="text-muted-foreground">
                  Keep a beautiful record of your plant's growth journey with photos and notes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reduced butterflies in the features section */}
        <Butterfly size={18} color="#34D399" top="30%" left="10%" delay={1} duration={10} />
      </section>

      {/* App Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-green-50 relative">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              See Gecko in Action
            </h2>
            <p className="text-muted-foreground mb-8">
              A beautiful, intuitive interface designed with plant lovers in mind
            </p>

            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative mx-auto w-64 h-[500px] rounded-3xl border-8 border-gray-800 overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 w-32 h-6 bg-gray-800 left-1/2 transform -translate-x-1/2 rounded-b-lg"></div>
              <div className="h-full w-full bg-green-50 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=300"
                  width={300}
                  height={600}
                  alt="Gecko App Preview"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/login">
              <Button className="rounded-full px-8 py-6 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600">
                <span className="text-lg">Start Your Plant Journey</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Reduced butterflies in the preview section */}
        <Butterfly size={15} color="#F472B6" top="70%" left="15%" delay={5} duration={12} />
      </section>
    </div>
  )
}

