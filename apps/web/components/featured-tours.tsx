import Image from "next/image"
import Link from "next/link"
import { featuredPrograms } from "@/data/programs"
import { Clock } from "lucide-react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import SparklesText from "@workspace/ui/components/sparkles-text"

export function FeaturedTours() {
  return (
    <section className="grid gap-4 xl:gap-6 2xl:gap-4">
      <div className="grid items-center justify-center gap-4 text-center xl:gap-6 2xl:gap-4">
        <SparklesText text="แพ็คเกจทัวร์ท่องเที่ยวยอดฮิต" className="text-4xl font-normal leading-none xl:text-6xl" />
        <p className="text-muted-foreground max-w-prose text-lg xl:text-xl">
          สำหรับนักท่องเที่ยวที่ต้องการสัมผัสวัฒนธรรมและประสบการณ์ที่หลากหลาย
          จีนมีเมืองที่มีความหลากหลายทางวัฒนธรรมและสถาปัตยกรรม ที่จะทำให้คุณมีประสบการณ์ที่ยิ่งใหญ่และทรงพลัง
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredPrograms.map((tour) => (
          <Card
            key={tour.id}
            className="group relative flex flex-col overflow-hidden rounded shadow-none transition-shadow hover:shadow-lg"
          >
            <CardHeader className="relative shrink-0 p-0">
              <Image
                src={tour.coverImage}
                alt={tour.title}
                width={200}
                height={200}
                className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute right-4 top-4">ยอดฮิต</Badge>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 p-6">
              <CardTitle className="text-xl">{tour.title}</CardTitle>
              <Separator />
              <CardDescription className="line-clamp-4 overflow-hidden text-ellipsis text-base">
                {tour.description}
              </CardDescription>
            </CardContent>

            <CardFooter className="mt-auto grid h-12 w-full grid-cols-2 p-0">
              <div className="bg-secondary flex size-full items-center justify-center">
                <Clock className="mr-1 size-4" />
                <span>{tour.period}</span>
              </div>
              <Button className="size-full rounded-none" asChild>
                <Link href={`/tours/study/${tour.id}`}>ดูเพิ่มเติม</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
