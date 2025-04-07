"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal, Edit, Trash2, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { usePlantStore } from "@/lib/store"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function PlantCard({ plant }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { deletePlant } = usePlantStore()

  // These functions are kept in the codebase but not used in the UI currently
  const handleWater = () => {
    console.log("Water plant:", plant.id)
    // Implementation would go here
  }

  const handleRotate = () => {
    console.log("Rotate plant for light:", plant.id)
    // Implementation would go here
  }

  return (
    <>
      <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
        <Link href={`/edit/${plant.id}`}>
          <Card className="overflow-hidden border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center p-3">
              {/* Plant image/avatar */}
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 border border-green-100">
                {plant.image ? (
                  <Image
                    src={plant.image || "/placeholder.svg"}
                    alt={plant.customName || plant.latinName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center">
                    <span className="text-xl">🪴</span>
                  </div>
                )}
              </div>

              {/* Plant info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  {plant.customName && <h3 className="font-medium truncate mr-1">{plant.customName}</h3>}
                  <Badge
                    variant="outline"
                    className="text-xs px-1.5 py-0 h-4 bg-green-50 text-green-600 border-green-200"
                  >
                    {getRandomEmoji()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground italic truncate">{plant.latinName}</p>
                {plant.notes && <p className="text-xs text-muted-foreground truncate mt-0.5">{plant.notes}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center ml-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href={`/edit/${plant.id}`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-500">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {plant.customName || plant.latinName} from your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletePlant(plant.id)} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Helper function to get a random plant-related emoji
function getRandomEmoji() {
  const emojis = ["🌱", "🌿", "🍃", "🌵", "🌴", "🌳", "🌲", "🍀", "🪴", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

