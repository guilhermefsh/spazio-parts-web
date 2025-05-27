"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { PartsImageProps } from "@/lib/types"

interface ProductImageCarouselProps {
  images: PartsImageProps[]
  productName: string
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-card rounded-lg overflow-hidden group">
        <Image
          src={images[currentImage]?.url || "/placeholder.svg"}
          alt={`${productName} - Imagem ${currentImage + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="bg-background/80 hover:bg-background"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="bg-background/80 hover:bg-background">
                <Expand className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="relative aspect-square">
                <Image
                  src={images[currentImage]?.url || "/placeholder.svg"}
                  alt={`${productName} - Imagem ${currentImage + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/80 rounded-full px-3 py-1">
            <span className="text-sm font-medium">
              {currentImage + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image.uid}-${index}`}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImage ? "border-primary" : "border-border hover:border-primary/50"
                }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={`${productName} - Miniatura ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
