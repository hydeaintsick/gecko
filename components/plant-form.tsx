"use client";
import { useVirtualizer } from "@tanstack/react-virtual";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import PLANT_DATABASE from "@/data/plants";
import { MemoriesGallery } from "./memories-gallery";

const EMOJIS = ["🌱", "🌿", "🍃", "🌵", "🌼", "🌸", "🌺"];

export default function PlantForm({
  initialData = null,
  onSubmit,
  loading,
}: any) {
  const [formData, setFormData] = useState({
    latinName: initialData?.latinName || "",
    birthDate: initialData?.birthDate || "",
    customName: initialData?.customName || "",
    notes: initialData?.notes || "",
    emoji: initialData?.emoji || "🌱",
    image: initialData?.image || null,
    memories: initialData?.memories || [],
  });
  const [previewImage, setPreviewImage] = useState(initialData?.image || null);
  const fileInputRef = useRef<any>(null);
  const [viewMode, setViewMode] = useState("gallery");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);

  useEffect(() => {
    console.log("formData:", formData);
  }, [formData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSelectChange = (value: any) => {
  //   console.log("handleSelectChange:value:", value);
  //   const selectedPlant = PLANT_DATABASE.find((plant) => plant.value === value);
  //   setFormData((prev) => ({
  //     ...prev,
  //     latinName: selectedPlant ? selectedPlant.label : value,
  //   }));
  // };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({ ...prev, image: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || uuidv4(),
    });
  };

  // const addMemory = () => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     memories: [
  //       ...prev.memories,
  //       {
  //         id: uuidv4(),
  //         title: "",
  //         image: null,
  //         date: new Date().toISOString().split("T")[0],
  //       },
  //     ],
  //   }));
  // };

  // const updateMemory = (id: string, field: string, value: any) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     memories: prev.memories.map((memory: any) =>
  //       memory.id === id ? { ...memory, [field]: value } : memory
  //     ),
  //   }));
  // };

  // const removeMemory = (id: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     memories: prev.memories.filter((memory: any) => memory.id !== id),
  //   }));
  // };

  // const handleMemoryImageUpload = (id: string, e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       // Créer une image pour vérifier les dimensions
  //       const img = new Image();
  //       img.onload = () => {
  //         updateMemory(id, "image", reader.result);
  //       };
  //       img.src = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const setMemories = (memories: any) => {
    setFormData((prev) => ({ ...prev, memories }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <div className="mt-1.5 flex justify-center">
          {previewImage ? (
            <div className="relative w-[100px] h-[100px] aspect-[4/3] rounded-full overflow-hidden border border-input flex space-center">
              <img
                src={previewImage || "/placeholder.svg"}
                alt="Plant preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 w-full">
              <Card
                className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex gap-2 mb-2">
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                </div>

                <p className="text-sm font-medium">Add picture</p>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Take it now or import from gallery
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Card>
            </div>
          )}
        </div>
        {previewImage && (
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={removeImage}
          >
            Change picture
          </Button>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="latinName">Latin Name</Label>
          <Input
            id="latinName"
            name="latinName"
            value={formData.latinName}
            onChange={handleChange}
            placeholder="Provide the latin name of your plant"
            className="flex-1 mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="customName">Custom Name (Optional)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="customName"
              name="customName"
              value={formData.customName}
              onChange={handleChange}
              placeholder="Give your plant a nickname"
              className="flex-1 mt-1.5"
            />
            <Select
              name="emoji"
              value={formData.emoji || "🌱"}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, emoji: value }))
              }
            >
              <SelectTrigger id="emoji" className="w-16 mt-1.5">
                <SelectValue placeholder="🌱" />
              </SelectTrigger>
              <SelectContent>
                {EMOJIS.map((emoji, index) => (
                  <SelectItem key={String(index)} value={emoji}>
                    {emoji}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="customName">Adoption</Label>
          <Input
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="When have you got it?"
            className="mt-1.5"
          />
        </div>

        <MemoriesGallery
          memories={formData.memories}
          onMemoriesChange={setMemories}
          className="mt-6"
        />

        <div>
          <Label htmlFor="notes">Care Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
            style={{ height: 500 }}
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add care instructions or other notes about your plant"
            className="mt-1.5 min-h-[100px]"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-4"
      >
        <Button
          type="submit"
          className="w-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600"
          disabled={loading}
        >
          {initialData ? "Save Changes" : "Add Plant"}
        </Button>
      </motion.div>
    </form>
  );
}

// function VirtualizedSelectContent({ items, onChange }: any) {
//   const [selected, setSelected] = useState<any>(null);
//   const parentRef = useRef(null);

//   useEffect(() => {
//     if (parentRef.current) {
//       rowVirtualizer.measure(); // force recalcul
//     }
//   }, [parentRef.current]);

//   const rowVirtualizer = useVirtualizer({
//     count: items.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 36,
//   });

//   function onSelectItem(item: any) {
//     setSelected(item);
//     if (onChange) onChange(item.value);
//   }

//   function handleSelectChange(value: any) {
//     const selectedItem = items.find((item: any) => item.value === value);
//     if (selectedItem) {
//       onSelectItem(selectedItem);
//     }
//   }

//   console.log("items:", items);
//   console.log(
//     "rowVirtualizer.getVirtualItems():",
//     rowVirtualizer.getVirtualItems()
//   );

//   return (
//     <Select
//       value={
//         items.find((p: any) => p.label === selected?.latinName)?.value || ""
//       }
//       onValueChange={handleSelectChange}
//     >
//       <SelectTrigger id="latinName" className="mt-1.5">
//         <SelectValue placeholder="Select or type a plant name" />
//       </SelectTrigger>
//       <SelectContent>
//         <div ref={parentRef} className="h-[200px] overflow-auto">
//           <div
//             style={{
//               height: `${rowVirtualizer.getTotalSize()}px`,
//               position: "relative",
//             }}
//           >
//             {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//               const item = items[virtualRow.index];
//               console.log("item:", item);
//               return (
//                 <div
//                   key={item.value}
//                   data-index={virtualRow.index}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     transform: `translateY(${virtualRow.start}px)`,
//                   }}
//                 >
//                   <SelectItem
//                     key={item.value}
//                     value={item.value}
//                     onClick={() => onSelectItem(item)}
//                   >
//                     {item.label}
//                   </SelectItem>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </SelectContent>
//     </Select>
//   );
// }
