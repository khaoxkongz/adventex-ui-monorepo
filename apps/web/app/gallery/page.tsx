import { Metadata } from "next"

import SparklesText from "@workspace/ui/components/sparkles-text"

import { GalleryPaginated } from "@/components/gallery-paginated"

export const metadata: Metadata = {
  title: "แกลลอรี่",
  description:
    "รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น",
}

export default function GalleryPage() {
  return (
    <div className="px-4 py-8">
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

      <GalleryPaginated />
    </div>
  )
}
