import Image from "next/image"

import BlurFade from "@workspace/ui/components/blur-fade"
import SparklesText from "@workspace/ui/components/sparkles-text"

const images = [
  "/images/gallery/GALLERY_1.png",
  "/images/gallery/GALLERY_2.png",
  "/images/gallery/GALLERY_3.png",
  "/images/gallery/GALLERY_4.png",
  "/images/gallery/GALLERY_5.png",
  "/images/gallery/GALLERY_6.png",
  "/images/gallery/GALLERY_7.png",
  "/images/gallery/GALLERY_8.png",
  "/images/gallery/GALLERY_9.png",
]

export const Gallery = () => {
  return (
    <section className="space-y-4 xl:space-y-8 2xl:space-y-12">
      <div className="flex flex-col items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
        <SparklesText text="แกลลอรี่" className="text-4xl font-normal leading-none xl:text-6xl" />
        <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
          รวมภาพความประทับใจจากการเดินทางของลูกค้าที่ไว้วางใจให้เราดูแล
          ทุกช่วงเวลาแห่งความสุขที่เราได้มีส่วนร่วมสร้างขึ้น
        </p>
      </div>
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((image, idx) => (
          <BlurFade key={idx} delay={0.25 + idx * 0.05} inView>
            <Image
              className="mb-4 size-full rounded-lg object-contain"
              src={image}
              height={idx % 2 === 0 ? 600 : 800}
              width={idx % 2 === 0 ? 800 : 600}
              alt={`Travel moment ${idx + 1}`}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}
