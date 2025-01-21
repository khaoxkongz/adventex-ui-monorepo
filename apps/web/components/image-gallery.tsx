"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

interface ImageGalleryProps {
  images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage]!}
          alt="An image"
          width={600}
          height={400}
          className="size-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg",
              selectedImage === index ? "ring-primary ring-2" : ""
            )}
          >
            <Image
              src={image}
              alt={`Gallery ${index + 1}`}
              width={200}
              height={200}
              className="size-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
