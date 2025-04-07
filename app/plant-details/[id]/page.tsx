"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets, Sun, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { usePlantStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Butterfly } from "@/components/butterfly";

export default function PlantDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { plants } = usePlantStore();
  const [plant, setPlant] = useState<any>(null);
  const [isWatering, setIsWatering] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const foundPlant = plants.find((p) => p.id === id);
    if (foundPlant) {
      setPlant(foundPlant);
    } else {
      router.push("/app");
    }
  }, [id, plants, router]);

  const handleWater = () => {
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 1500);
  };

  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 1500);
  };

  if (!plant) return null;

  return (
    <div className="container max-w-md mx-auto px-4 py-8 relative">
      {/* Add butterflies to the details page */}
      <Butterfly
        size={20}
        color="#F472B6"
        top="15%"
        right="10%"
        delay={1}
        duration={12}
      />
      <Butterfly
        size={16}
        color="#34D399"
        top="40%"
        left="5%"
        delay={3}
        duration={10}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Plant Details</h1>
        </header>

        <Card className="overflow-hidden border-green-100 mb-6">
          <div className="relative">
            <motion.div
              className="aspect-[4/3] relative overflow-hidden"
              animate={isRotating ? { rotateY: 360 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {plant.image ? (
                <Image
                  src={plant.image || "/placeholder.svg"}
                  alt={plant.customName || plant.latinName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center">
                  <span className="text-6xl">🪴</span>
                </div>
              )}

              {isWatering && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, 100] }}
                    transition={{ duration: 1.5, ease: "easeIn" }}
                    className="flex"
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: 2,
                        }}
                      >
                        💧
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            <Link href={`/edit/${plant.id}`} className="absolute top-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <CardContent className="p-4">
            <div className="mb-4">
              {plant.customName && (
                <div className="flex items-center mb-1">
                  <h2 className="text-xl font-medium mr-2">
                    {plant.customName}
                  </h2>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200"
                  >
                    🌱 Plant
                  </Badge>
                </div>
              )}
              <p className="text-sm text-muted-foreground italic">
                {plant.latinName}
              </p>
            </div>

            {plant.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-1">Notes</h3>
                <p className="text-sm text-muted-foreground">{plant.notes}</p>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={handleWater}
                className="flex-1 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100"
              >
                <Droplets className="mr-2 h-4 w-4" />
                Water Plant
              </Button>
              <Button
                onClick={handleRotate}
                className="flex-1 rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-100"
              >
                <Sun className="mr-2 h-4 w-4" />
                Rotate Plant
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Plant care history would go here */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Care History</h3>
          <p className="text-sm text-muted-foreground">
            Coming soon! Track your plant's watering, fertilizing, and care
            history.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
