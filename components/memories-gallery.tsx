"use client";

import { useState } from "react";
import { Camera, X, Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export type Memory = {
  id: string;
  title: string;
  image: string | null;
  date: string;
};

type MemoriesGalleryProps = {
  memories: Memory[];
  onMemoriesChange: (memories: Memory[]) => void;
  className?: string;
};

export function MemoriesGallery({
  memories,
  onMemoriesChange,
  className = "",
}: MemoriesGalleryProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);

  const addMemory = () => {
    const newMemories = [
      ...memories,
      {
        id: uuidv4(),
        title: "",
        image: null,
        date: new Date().toJSON(),
      },
    ];
    onMemoriesChange(newMemories);
  };

  const updateMemory = (id: string, field: string, value: any) => {
    const updatedMemories = memories.map((memory) =>
      memory.id === id
        ? {
            ...memory,
            [field]: value,
            date: new Date().toISOString().split("T")[0],
          }
        : memory
    );
    onMemoriesChange(updatedMemories);
  };

  const removeMemory = (id: string) => {
    const filteredMemories = memories.filter((memory) => memory.id !== id);
    onMemoriesChange(filteredMemories);
  };

  const handleMemoryImageUpload = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string; // C'est déjà en base64 avec Data URL
      updateMemory(id, "image", base64);
    };

    reader.readAsDataURL(file); // convertit le fichier en Data URL (base64)
  };

  const openDeviceLibrary = (memoryId: string) =>
    document.getElementById(`memory-image-${memoryId}`)?.click();

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2 h-[60px]">
        <div className="flex items-center gap-2">
          <Label htmlFor="edit-mode" className="text-sm">
            Memories
          </Label>
          <div className="flex items-center gap-2">
            <Label
              htmlFor="edit-mode"
              className="text-xs text-muted-foreground"
            >
              Gallery
            </Label>
            <Switch
              id="edit-mode"
              checked={isEditMode}
              onCheckedChange={setIsEditMode}
            />
            <Label
              htmlFor="edit-mode"
              className="text-xs text-muted-foreground"
            >
              Edit
            </Label>
          </div>
        </div>

        {isEditMode && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addMemory}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Memory
          </Button>
        )}
      </div>

      {memories.length > 0 ? (
        isEditMode ? (
          <div className="relative">
            <div className="overflow-x-auto pb-4 -mx-4 px-4">
              <div className="flex gap-4 min-w-max">
                {memories.map((memory, index) => (
                  <Card
                    key={memory.id}
                    className="p-4 relative w-[280px] shrink-0"
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 rounded-full w-6 h-6 z-10"
                      onClick={() => removeMemory(memory.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>

                    <div className="space-y-3">
                      <div>
                        <Label
                          htmlFor={`memory-title-${index}`}
                          className="text-sm"
                        >
                          Title
                        </Label>
                        <Input
                          id={`memory-title-${index}`}
                          value={memory.title}
                          onChange={(e) =>
                            updateMemory(memory.id, "title", e.target.value)
                          }
                          placeholder="Memory title"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Photo</Label>
                        <div className="mt-1">
                          {memory.image ? (
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-input">
                              <img
                                src={memory.image || "/placeholder.svg"}
                                alt={`Memory ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="absolute top-[42%] left-[10%] w-[80%] h-10"
                                onClick={() => openDeviceLibrary(memory.id)}
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <div
                              className="flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors border rounded-lg aspect-square"
                              onClick={() => openDeviceLibrary(memory.id)}
                            >
                              <Camera className="h-6 w-6 text-muted-foreground mb-2" />
                              <p className="text-xs font-medium">
                                Add memory photo
                              </p>
                            </div>
                          )}
                          <input
                            id={`memory-image-${memory.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleMemoryImageUpload(memory.id, e)
                            }
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            <div className="relative">
              <div className="overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-3 min-w-max">
                  {memories.map((memory, index) => (
                    <div
                      key={memory.id}
                      className="w-[180px] shrink-0 cursor-pointer"
                      onClick={() => {
                        setSelectedMemory(memory);
                        setIsMemoryModalOpen(true);
                      }}
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-input">
                        {memory.image ? (
                          <img
                            src={memory.image || "/placeholder.svg"}
                            alt={memory.title || `Memory ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5">
                        <p className="text-sm font-medium truncate">
                          {memory.title || `Memory ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(memory.date).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="w-full text-center py-6 border rounded-lg bg-muted/20">
          <p className="text-sm text-muted-foreground">
            {isEditMode
              ? "No memories yet. Add some special moments!"
              : "No memories yet. Switch to edit mode to add memories."}
          </p>
        </div>
      )}

      {isMemoryModalOpen && selectedMemory && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsMemoryModalOpen(false)}
        >
          <div
            className="bg-background rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4 w-full">
                <h3 className="text-lg text-center font-semibold">
                  {selectedMemory.title || "Memory"}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMemoryModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {selectedMemory.image ? (
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedMemory.image || "/placeholder.svg"}
                    alt={selectedMemory.title || "Memory"}
                    className="w-full object-contain max-h-[60vh]"
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm text-center text-muted-foreground">
                  {new Date(selectedMemory.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
