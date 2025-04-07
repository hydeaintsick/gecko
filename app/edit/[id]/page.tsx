"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PlantForm from "@/components/plant-form";
import { usePlantStore } from "@/lib/store";

export default function EditPlantPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { plants, updatePlant } = usePlantStore();
  const [plant, setPlant] = useState<any>(null);

  useEffect(() => {
    const foundPlant = plants.find((p: any) => p.id === id);
    if (foundPlant) {
      setPlant(foundPlant);
    } else {
      router.push("/app");
    }
  }, [id, plants, router]);

  const handleSubmit = (plantData: any) => {
    updatePlant(id, plantData);
    router.push("/app");
  };

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

        <PlantForm initialData={plant} onSubmit={handleSubmit} />
      </motion.div>
    </div>
  );
}
