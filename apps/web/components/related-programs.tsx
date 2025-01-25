import Image from "next/image"
import Link from "next/link"
import { CalendarDays } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card"

import type { Program } from "@/types/program"

interface RelatedProgramsProps {
  programs: Program[]
}

export function RelatedPrograms({ programs }: RelatedProgramsProps) {
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">แพ็คเกจทัวร์เรียนที่น่าสนใจ</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
                <Image
                  src={program.coverImage || "/placeholder.svg"}
                  alt={program.title}
                  fill
                  loading="eager"
                  className="object-cover object-center"
                />
              </div>
            </CardHeader>
            <CardContent className="grow p-4">
              <CardTitle className="mb-2 text-lg">{program.title}</CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
                {program.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-0">
              <div className="flex size-full items-center justify-center gap-2 border p-4">
                <CalendarDays className="text-muted-foreground size-4" />
                <span className="text-muted-foreground text-sm">{program.period}</span>
              </div>
              <Button asChild className="size-full rounded-none">
                <Link href={`/tours/study/${program.id}`}>ดูเพิ่มเติม</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
