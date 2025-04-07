"use client";

import { useState, useRef } from "react";
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

// Sample plant database for the dropdown
const PLANT_DATABASE = [
  { value: "monstera-deliciosa", label: "Monstera Deliciosa" },
  { value: "ficus-lyrata", label: "Ficus Lyrata (Fiddle Leaf Fig)" },
  {
    value: "sansevieria-trifasciata",
    label: "Sansevieria Trifasciata (Snake Plant)",
  },
  {
    value: "zamioculcas-zamiifolia",
    label: "Zamioculcas Zamiifolia (ZZ Plant)",
  },
  { value: "pothos-aureum", label: "Epipremnum Aureum (Pothos)" },
  { value: "calathea-orbifolia", label: "Calathea Orbifolia" },
  {
    value: "spathiphyllum-wallisii",
    label: "Spathiphyllum Wallisii (Peace Lily)",
  },
  {
    value: "chlorophytum-comosum",
    label: "Chlorophytum Comosum (Spider Plant)",
  },
];

export default function PlantForm({ initialData = null, onSubmit }: any) {
  const [formData, setFormData] = useState({
    latinName: initialData?.latinName || "",
    customName: initialData?.customName || "",
    notes: initialData?.notes || "",
    image: initialData?.image || null,
  });
  const [previewImage, setPreviewImage] = useState(initialData?.image || null);
  const fileInputRef = useRef<any>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: any) => {
    const selectedPlant = PLANT_DATABASE.find((plant) => plant.value === value);
    setFormData((prev) => ({
      ...prev,
      latinName: selectedPlant ? selectedPlant.label : value,
    }));
  };

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="latinName">Latin Name</Label>
          <Select
            value={
              PLANT_DATABASE.find((p) => p.label === formData.latinName)
                ?.value || ""
            }
            onValueChange={handleSelectChange}
          >
            <SelectTrigger id="latinName" className="mt-1.5">
              <SelectValue placeholder="Select or type a plant name" />
            </SelectTrigger>
            <SelectContent>
              {PLANT_DATABASE.map((plant) => (
                <SelectItem key={plant.value} value={plant.value}>
                  {plant.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="latinNameCustom"
            name="latinName"
            value={formData.latinName}
            onChange={handleChange}
            placeholder="Or type a custom latin name"
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="customName">Custom Name (Optional)</Label>
          <Input
            id="customName"
            name="customName"
            value={formData.customName}
            onChange={handleChange}
            placeholder="Give your plant a nickname"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label>Plant Photo</Label>
          <div className="mt-1.5">
            {previewImage ? (
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border border-input">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Plant preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 rounded-full w-8 h-8"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Card
                  className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Upload</p>
                  <p className="text-xs text-muted-foreground">from gallery</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </Card>
                <Card className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Take Photo</p>
                  <p className="text-xs text-muted-foreground">with camera</p>
                </Card>
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="notes">Care Notes (Optional)</Label>
          <Textarea
            id="notes"
            name="notes"
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
        >
          {initialData ? "Save Changes" : "Add Plant"}
        </Button>
      </motion.div>
    </form>
  );
}
