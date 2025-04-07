"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PlantForm from "@/components/plant-form"
import { usePlantStore } from "@/lib/store"

export default function AddPlantPage() {
  const router = useRouter()
  const { addPlant } = usePlantStore()

  const handleSubmit = (plantData) => {
    addPlant(plantData)
    router.push("/")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Plant 🌱</h1>
        </header>

        <PlantForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  )
}

