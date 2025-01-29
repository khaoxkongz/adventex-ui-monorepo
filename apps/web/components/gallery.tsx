"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"

import { Button } from "@workspace/ui/components/button"
import SparklesText from "@workspace/ui/components/sparkles-text"
import { cn } from "@workspace/ui/lib/utils"

const images = [
  {
    src: "/images/gallery/GALLERY_1.png",
    alt: "Gallery image 1",
    span: "md:col-span-1 md:row-span-2",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/GALLERY_2.png",
    alt: "Gallery image 2",
    span: "md:col-span-1 md:row-span-1",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_3.png",
    alt: "Gallery image 3",
    span: "md:col-span-2 md:row-span-1",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_4.png",
    alt: "Gallery image 4",
    span: "md:col-span-2 md:row-span-2",
    width: 800,
    height: 800,
  },
  {
    src: "/images/gallery/GALLERY_5.png",
    alt: "Gallery image 5",
    span: "md:col-span-1 md:row-span-2",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_6.png",
    alt: "Gallery image 6",
    span: "md:col-span-1 md:row-span-1",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_7.png",
    alt: "Gallery image 7",
    span: "md:col-span-2 md:row-span-1",
    width: 1200,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_8.png",
    alt: "Gallery image 8",
    span: "md:col-span-1 md:row-span-1",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_9.png",
    alt: "Gallery image 9",
    span: "md:col-span-1 md:row-span-1",
    width: 600,
    height: 400,
  },
]

export function Gallery() {
  return (
    <section className="space-y-4 xl:space-y-8 2xl:space-y-12">
      <div className="flex flex-col items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
        <SparklesText text="แกลลอรี่" className="text-4xl font-normal leading-none xl:text-6xl" />
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
            รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล
          </p>
          <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
            ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น
          </p>
        </div>
      </div>

      <div className="grid auto-rows-[200px] grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={cn("group relative cursor-pointer overflow-hidden rounded-xl", image.span)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Button variant="outline" asChild>
          <Link href="/gallery">คลิกเพื่อดูแกลลอรี่ของเรา</Link>
        </Button>
      </div>
    </section>
  )
}
