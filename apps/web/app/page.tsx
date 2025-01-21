import { FeaturedTours } from "@/components/featured-tours"
import { Gallery } from "@/components/gallery"
import { HeroCarousel } from "@/components/hero-carousel"
import { SearchDestinations } from "@/components/search-destinations"
import { Testimonials } from "@/components/testimonials"

export default function Page() {
  return (
    <div className="border-grid border-b">
      <div className="container-wrapper">
        <div className="container py-4 xl:py-6 2xl:py-4">
          <div className="grid gap-8 md:gap-16 lg:gap-24">
            <HeroCarousel />
            <SearchDestinations />
            <FeaturedTours />
            <Testimonials />
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  )
}
