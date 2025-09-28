"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type ImageUploadProps = {
  value: string;
  onChange: (value: string) => void;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!cloudName || !uploadPreset) {
        toast({
            variant: "destructive",
            title: "Upload not configured",
            description: "Cloudinary environment variables are not set.",
        });
        return;
      }
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        onChange(data.secure_url);
         toast({
            title: "Image Uploaded",
            description: "Your image has been uploaded successfully.",
        });
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
         toast({
            variant: "destructive",
            title: "Upload Failed",
            description: "There was a problem uploading your image.",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label>Cover Image</Label>
      <Card>
        <CardContent className="p-4">
          {value ? (
            <div className="relative group">
              <Image
                src={value}
                alt="Image preview"
                width={400}
                height={200}
                className="rounded-md object-cover w-full h-auto"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
                {isUploading ? (
                    <>
                        <Loader2 className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                    </>
                ) : (
                    <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                            Drag & drop or click to upload
                        </p>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full"
                            disabled={isUploading}
                        />
                    </>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
