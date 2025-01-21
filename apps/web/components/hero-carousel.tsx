"use client"

import * as React from "react"
import Image from "next/image"
import adventexHeroCover from "@/assets/images/adventex-hero-cover.png"

import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@workspace/ui/components/carousel"
import ShineBorder from "@workspace/ui/components/shine-border"
import { cn } from "@workspace/ui/lib/utils"

const slides = [
  {
    id: 1,
    image: adventexHeroCover,
    alt: "Special promotion banner with worldwide landmarks including Eiffel Tower, Statue of Liberty, and airplane on red background",
  },
]

export const HeroCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const handleScrollTo = (index: number) => {
    api?.scrollTo(index)
    setCurrent(index)
  }

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section>
      <ShineBorder className="size-full border p-1" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
        <Carousel setApi={setApi} className="relative size-full overflow-hidden rounded-lg">
          <CarouselContent>
            {slides.map(({ image, alt, id }) => (
              <CarouselItem key={id}>
                <AspectRatio ratio={3 / 1} className="size-full overflow-hidden rounded-lg">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    className="size-full object-fill"
                    loading={id === 1 ? "eager" : "lazy"}
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-2 left-1/2 flex w-32 -translate-x-1/2 justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleScrollTo(i)}
                className={cn("h-2 rounded-full transition-all", current === i ? "w-8 bg-white" : "w-2 bg-white/50")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </ShineBorder>
    </section>
  )
}
