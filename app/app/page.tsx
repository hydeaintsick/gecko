"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, Leaf, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlantStore } from "@/lib/store";
import PlantCard from "@/components/plant-card";
import { motion, AnimatePresence } from "framer-motion";
import { Butterfly } from "@/components/butterfly";

export default function HomePage() {
  const { plants } = usePlantStore();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPlants = plants.filter(
    (plant) =>
      plant.customName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.latinName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return <></>;

  return (
    <div className="container max-w-md mx-auto px-4 py-8 relative">
      {/* Add butterflies to the home page */}
      <Butterfly
        size={18}
        color="#F472B6"
        top="10%"
        right="5%"
        delay={2}
        duration={12}
      />
      <Butterfly
        size={15}
        color="#60A5FA"
        top="30%"
        left="5%"
        delay={5}
        duration={10}
      />
      <Butterfly
        size={20}
        color="#34D399"
        top="60%"
        right="10%"
        delay={8}
        duration={15}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Gecko
            </h1>
            <p className="text-muted-foreground">Your plant companion 🌿</p>
          </div>
          <div className="flex gap-2">
            <Link href="/add">
              <Button className="rounded-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Plant
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search plants..."
            className="pl-10 rounded-full border-green-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <AnimatePresence mode="wait">
          {plants.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center justify-center p-12 text-center bg-gradient-to-b from-green-50 to-transparent rounded-2xl border border-green-100"
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <Leaf className="h-10 w-10 text-green-500" />
              </motion.div>
              <h2 className="text-xl font-medium mb-2">No plants yet! 🌱</h2>
              <p className="text-muted-foreground mb-4">
                Start adding your plant friends to track their care
              </p>
              <Link href="/add">
                <Button variant="outline" className="rounded-full">
                  Add your first plant
                </Button>
              </Link>

              {/* Animated gecko at the bottom */}
              <motion.div
                className="absolute bottom-4 right-4"
                animate={{
                  x: [0, 20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <span className="text-3xl">🦎</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="plants"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Plants count */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {filteredPlants.length}{" "}
                  {filteredPlants.length === 1 ? "plant" : "plants"} in your
                  garden
                </h2>
                {searchQuery && filteredPlants.length !== plants.length && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear filter
                  </Button>
                )}
              </div>

              {/* Plant list */}
              <div className="space-y-2">
                {filteredPlants.length > 0 ? (
                  filteredPlants.map((plant, index) => (
                    <motion.div
                      key={plant.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <PlantCard plant={plant} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-10"
                  >
                    <p className="text-muted-foreground">
                      No plants match your search 🔍
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Animated gecko at the bottom */}
              <motion.div
                className="fixed bottom-20 right-4 z-10"
                animate={{
                  x: [0, 10, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <span className="text-3xl">🦎</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
