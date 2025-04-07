"use client"

import { useState } from "react"
import { LogOut, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Footer() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    router.push("/landing")
  }

  return (
    <motion.footer
      className="py-4 px-6 border-t border-green-100 mt-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container max-w-md mx-auto flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          <p className="flex items-center">
            Made with
            <motion.span
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={
                isHovered
                  ? {
                      scale: [1, 1.5, 1],
                      rotate: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
              className="inline-flex mx-1"
            >
              <Heart className="h-3 w-3 text-red-400 fill-red-400" />
            </motion.span>
            for plant lovers
          </p>
          <p>© {new Date().getFullYear()} Gecko</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <LogOut className="h-3 w-3" />
          Logout
        </Button>
      </div>
    </motion.footer>
  )
}

