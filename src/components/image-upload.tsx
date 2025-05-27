"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { uploadImage } from "@/lib/storage"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onImagesChange, maxImages = 8 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (images.length + files.length > maxImages) {
      alert(`Você pode fazer upload de no máximo ${maxImages} imagens`)
      return
    }

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const { url } = await uploadImage(file)
        return url
      })

      const newUrls = await Promise.all(uploadPromises)
      onImagesChange([...images, ...newUrls])
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Erro ao fazer upload das imagens")
    } finally {
      setUploading(false)
      // Limpa o input para permitir selecionar os mesmos arquivos novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <Card key={url} className="relative aspect-square">
            <Image
              src={url}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
        {images.length < maxImages && (
          <Card className="relative aspect-square">
            <label
              htmlFor="image-upload"
              className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors rounded-lg"
            >
              <div className="text-center">
                <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Adicionar imagem</span>
              </div>
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </Card>
        )}
      </div>
      {uploading && (
        <p className="text-sm text-muted-foreground">
          Fazendo upload das imagens...
        </p>
      )}
    </div>
  )
}
