"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, Plus, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onImagesChange, maxImages = 10 }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    const newImages: string[] = []
    let processedFiles = 0

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string)
            processedFiles++

            if (processedFiles === files.length) {
              const totalImages = [...images, ...newImages]
              onImagesChange(totalImages.slice(0, maxImages))
            }
          }
        }
        reader.readAsDataURL(file)
      } else {
        processedFiles++
        if (processedFiles === files.length && newImages.length > 0) {
          const totalImages = [...images, ...newImages]
          onImagesChange(totalImages.slice(0, maxImages))
        }
      }
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const addImageUrl = () => {
    if (urlInput.trim() && images.length < maxImages) {
      // Validação básica de URL
      try {
        new URL(urlInput.trim())
        onImagesChange([...images, urlInput.trim()])
        setUrlInput("")
      } catch {
        alert("URL inválida. Por favor, insira uma URL válida.")
      }
    }
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onImagesChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          Imagens do Produto ({images.length}/{maxImages})
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={images.length >= maxImages}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* Área de Upload */}
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-8 text-center">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Arraste e solte imagens aqui ou clique para selecionar</p>
          <p className="text-sm text-muted-foreground">Suporta: JPG, PNG, WebP (máx. 5MB cada)</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Adicionar por URL */}
      <div className="flex space-x-2">
        <Input
          placeholder="Ou cole uma URL de imagem..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addImageUrl()
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={addImageUrl}
          disabled={!urlInput.trim() || images.length >= maxImages}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Preview das Imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative bg-card rounded-lg overflow-hidden border border-border">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=200&width=200"
                  }}
                />

                {/* Overlay com controles */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                  {index > 0 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => moveImage(index, index - 1)}>
                      ←
                    </Button>
                  )}

                  <Button type="button" variant="destructive" size="sm" onClick={() => removeImage(index)}>
                    <X className="w-4 h-4" />
                  </Button>

                  {index < images.length - 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => moveImage(index, index + 1)}>
                      →
                    </Button>
                  )}
                </div>

                {/* Indicador de imagem principal */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Principal
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
