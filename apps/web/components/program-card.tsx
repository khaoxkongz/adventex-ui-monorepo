"use client"

import Image from "next/image"
import Link from "next/link"
import { Activity, CalendarDays, MapPin } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { Program } from "@/types/program"
import { usePrograms } from "@/hooks/use-programs"

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const { layout } = usePrograms()

  return (
    <Card
      className={`flex justify-between ${layout === "list" ? "flex-row" : "flex-col"}`}
    >
      <div className={`relative ${layout === "list" ? "w-1/3" : "w-full"}`}>
        <Image
          src={program.coverImage || "/placeholder.svg"}
          alt={program.title}
          width={600}
          height={400}
          className="size-full rounded-t-lg object-cover"
        />
      </div>
      <div
        className={`flex flex-col ${layout === "list" ? "w-2/3" : "w-full"}`}
      >
        <CardHeader>
          <CardTitle className="text-primary text-xl font-bold">
            {program.title}
          </CardTitle>
          <div className="text-muted-foreground flex items-center gap-2 text-center text-sm">
            <MapPin className="size-4" />
            <span>{program.location}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <CardDescription className="line-clamp-4 text-base">
            {program.description}
          </CardDescription>
          {layout === "list" && program.highlights.length > 0 ? (
            <div className="space-y-4">
              <p>ประเด็นสำคัญ:</p>
              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {program.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Activity className="text-primary size-4" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-0">
          <div className="flex size-full items-center justify-center gap-2 border p-4">
            <CalendarDays className="text-muted-foreground size-4" />
            <span className="text-muted-foreground text-sm">
              {program.period}
            </span>
          </div>
          <Button className="size-full rounded-none" asChild>
            <Link href={`/tours/study/${program.id}`}>ดูเพิ่มเติม</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
