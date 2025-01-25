"use client"

import Link from "next/link"
import { Activity, MapPin } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

import type { Program } from "@/types/program"

interface TourInfoProps {
  tourData: Program
}

export function TourInfo({ tourData }: TourInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-muted-foreground flex items-center gap-2">
          <MapPin className="size-4" />
          <span>{tourData.location}</span>
        </div>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{tourData.title}</h1>
          <p className="text-muted-foreground mt-2">{tourData.description}</p>
        </header>
      </div>

      <div className="border-primary rounded-lg border p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">ราคาเข้าร่วมโครงการ</p>
            <p className="text-3xl font-bold">{tourData.defaultPrice.toLocaleString()}.-</p>
          </div>
          <Button className="p-8 text-2xl" asChild>
            <Link href="/contact">สมัครเรียน</Link>
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">ราคารวมทุกอย่าง</p>
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold tracking-tight">ราคาค่าโครงการรวม</h3>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {tourData.highlights.map((highlight, index) => (
            <li key={index} className="flex items-center gap-2">
              <Activity className="text-primary size-4" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
