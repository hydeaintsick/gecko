"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlantForm from "@/components/plant-form";
import { usePlantStore } from "@/lib/store";
import toast from "react-hot-toast";

export default function EditPlantPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { plants, updatePlant } = usePlantStore();
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const id = searchParams.get("id");

  // Si y a pas d'id, on redirige vers app
  if (!id) {
    router.push("/app");
    return null;
  }

  useEffect(() => {
    const foundPlant = plants.find((p: any) => p.id === id);
    if (foundPlant) {
      setPlant(foundPlant);
    } else {
      router.push("/app");
    }
  }, [id, plants, router]);

  async function handleSubmit(plantData: any) {
    setLoading(true);
    try {
      const success = await updatePlant(id as string, plantData);
      if (success) {
        router.push("/app");
      } else {
        toast.error("Unable to update your plant.");
      }
    } catch (e) {
      console.log("Error updating plant:", e);
      toast.error("Unable to update your plant.");
    }
    setLoading(false);
  }

  if (!plant) return null;

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
          <h1 className="text-2xl font-bold">Edit Plant 🪴</h1>
        </header>

        <PlantForm
          initialData={plant}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>
    </div>
  );
}
