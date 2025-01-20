"use client"

import * as React from "react"
import Image from "next/image"

import { cn } from "@workspace/ui/lib/utils"

interface ImageGalleryProps {
  tourData: {
    id: string
    title: string
    description: string
    defaultPrice: number
    location: string
    images: string[]
    highlights: string[]
    about: {
      title: string
      items: string[]
    }[]
    itinerary: {
      week: string
      title: string
      description: string
      activities: string[]
    }[]
  }
}

export const ImageGallery = ({ tourData }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = React.useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={tourData.images[selectedImage]!}
          alt={tourData.title}
          width={600}
          height={400}
          className="size-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {tourData.images.map((image, index) => (
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
