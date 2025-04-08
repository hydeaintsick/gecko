"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlantForm from "@/components/plant-form";
import { usePlantStore } from "@/lib/store";
import toast from "react-hot-toast";

export default function AddPlantPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { addPlant } = usePlantStore();

  async function handleSubmit(plantData: any) {
    setLoading(true);
    try {
      const success = await addPlant(plantData);
      if (success) {
        router.push("/app");
      } else {
        toast.error("Unable to create a new plant.");
      }
    } catch {
      toast.error("Unable to create a new plant.");
    }
    setLoading(false);
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex items-center mb-8">
          <Link href="/app">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Plant 🌱</h1>
        </header>

        <PlantForm onSubmit={handleSubmit} loading={loading} />
      </motion.div>
    </div>
  );
}
