import * as React from "react"

import { ProgramCards } from "@/components/program-cards"
import { SearchFilter } from "@/components/search-filter"

export default function TourStudyPage() {
  return (
    <React.Fragment>
      <div className="container-wrapper">
        <div className="container py-4 xl:py-6 2xl:py-4">
          <section className="relative overflow-hidden rounded-lg">
            <div className="flex flex-col gap-2 p-4">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">แพ็คเกจเรียน</h1>
              <p className="text-muted-foreground max-w-prose leading-7">
                ค้นพบแพ็คเกจการศึกษาที่น่าสนใจ เราคัดสรรสถานที่ศึกษาที่น่าสนใจมาให้คุณได้เลือกสรร
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.1),transparent_50%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,87,34,0.05),transparent_50%)]" />
          </section>
        </div>
      </div>
      <React.Suspense>
        <SearchFilter />
        <ProgramCards />
      </React.Suspense>
    </React.Fragment>
  )
}
