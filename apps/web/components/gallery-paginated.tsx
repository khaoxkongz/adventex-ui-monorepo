"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "motion/react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"

const IMAGES_PER_PAGE = 9

const images = [
  {
    src: "/images/gallery/GALLERY_1.png",
    alt: "Gallery image 1",
    width: 600,
    height: 800,
  },
  {
    src: "/images/gallery/GALLERY_2.png",
    alt: "Gallery image 2",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_3.png",
    alt: "Gallery image 3",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_4.png",
    alt: "Gallery image 4",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_5.png",
    alt: "Gallery image 5",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_6.png",
    alt: "Gallery image 6",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_7.png",
    alt: "Gallery image 7",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_8.png",
    alt: "Gallery image 8",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_9.png",
    alt: "Gallery image 9",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_9.png",
    alt: "Gallery image 9",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_10.png",
    alt: "Gallery image 10",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_11.png",
    alt: "Gallery image 11",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_12.png",
    alt: "Gallery image 12",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_13.png",
    alt: "Gallery image 13",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_14.png",
    alt: "Gallery image 14",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_15.png",
    alt: "Gallery image 15",
    width: 600,
    height: 400,
  },
  {
    src: "/images/gallery/GALLERY_16.png",
    alt: "Gallery image 16",
    width: 600,
    height: 400,
  },
]

export const GalleryPaginated = () => {
  const [currentPage, setCurrentPage] = React.useState(1)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const scrollToTop = React.useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  const handlePageChange = React.useCallback(
    (newPage: number) => {
      setCurrentPage(newPage)
      scrollToTop()
    },
    [scrollToTop]
  )

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE)

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE
  const endIndex = startIndex + IMAGES_PER_PAGE
  const currentImages = images.slice(startIndex, endIndex)

  return (
    <div ref={containerRef} className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {currentImages.map((image, index) => (
          <motion.div
            key={startIndex + index}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl"
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
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(currentPage - 1, 1))
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(i + 1)
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
