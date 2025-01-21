import Image from "next/image"
import Link from "next/link"

import SparklesText from "@workspace/ui/components/sparkles-text"
import { cn } from "@workspace/ui/lib/utils"

const cities = [
  {
    id: "item-1",
    name: "HARBIN",
    className: "col-span-6 col-start-1 row-span-3 row-start-1 lg:row-span-8",
    image: "/images/city/harbin.jpg",
    alt: "Ice and Snow World in Harbin featuring magnificent illuminated ice sculptures and buildings",
    href: "/destinations/harbin",
  },
  {
    id: "item-2",
    name: "SHANGHAI",
    className: "col-span-3 col-start-1 row-span-3 row-start-4 lg:row-span-4 lg:row-start-9",
    image: "/images/city/shanghai.jpg",
    alt: "Shanghai skyline at night featuring the iconic Oriental Pearl Tower and modern skyscrapers",
    href: "/destinations/shanghai",
  },
  {
    id: "item-3",
    name: "CHENGDU",
    className: "col-span-3 col-start-4 row-span-3 row-start-4 lg:row-span-4 lg:row-start-9",
    image: "/images/city/chengdu.jpg",
    alt: "Traditional Chinese architecture in Chengdu with red lanterns and ancient buildings",
    href: "/destinations/chengdu",
  },
  {
    id: "item-4",
    name: "BEIJING",
    className:
      "col-span-6 col-start-1 row-span-3 row-start-7 md:col-span-3 md:row-span-6 lg:col-start-7 lg:row-span-12 lg:row-start-1",
    image: "/images/city/beijing.jpg",
    alt: "The Great Wall of China winding through mountains near Beijing",
    href: "/destinations/beijing",
  },
  {
    id: "item-5",
    name: "GUANGZHOU",
    className:
      "col-span-3 col-start-1 row-span-3 row-start-10 md:col-start-4 md:row-start-7 lg:col-span-3 lg:col-start-10 lg:row-span-6 lg:row-start-1",
    image: "/images/city/guangzhou.jpg",
    alt: "Modern Guangzhou cityscape with Canton Tower illuminated at night",
    href: "/destinations/guangzhou",
  },
  {
    id: "item-6",
    name: "CHONGQING",
    className:
      "col-span-3 col-start-4 row-span-3 row-start-10 lg:col-span-3 lg:col-start-10 lg:row-span-6 lg:row-start-7",
    image: "/images/city/chongqing.jpg",
    alt: "Dramatic nighttime view of Chongqing's riverside skyline with traditional stilt houses",
    href: "/destinations/chongqing",
  },
]

export const CityHighlights = () => {
  return (
    <section className="grid gap-4 xl:gap-6 2xl:gap-4">
      <div className="grid items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
        <SparklesText text="เมืองยอดนิยม" className="text-4xl font-normal leading-none xl:text-6xl" />
        <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
          สำหรับนักท่องเที่ยวที่ต้องการสัมผัสวัฒนธรรมและประสบการณ์ที่หลากหลาย
          จีนมีเมืองที่มีความหลากหลายทางวัฒนธรรมและสถาปัตยกรรม ที่จะทำให้คุณมีประสบการณ์ที่ยิ่งใหญ่และทรงพลัง
        </p>
      </div>

      <div className="grid grid-cols-6 grid-rows-12 gap-2 lg:grid-cols-12 lg:grid-rows-12">
        {cities.map((city) => (
          <div
            key={city.id}
            className={cn("bg-card text-card-foreground overflow-hidden rounded-lg border", city.className)}
          >
            <Link href={city.href}>
              <div className="group relative size-full">
                <Image
                  src={city.image}
                  alt={city.alt}
                  width={400}
                  height={400}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
                  <span className="mb-1 font-semibold">{city.name}</span>
                </div>
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
