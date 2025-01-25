import * as React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { initialPrograms } from "@/data/programs"
import { initialUniversities } from "@/data/universities"
import { Activity, Box, PanelsTopLeft } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ImageGallery } from "@/components/image-gallery"
import { RelatedPrograms } from "@/components/related-programs"
import { TourInfo } from "@/components/tour-info"

import { generateStructuredData } from "./structured-data"

interface TourStudySlugPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: TourStudySlugPageProps): Promise<Metadata> {
  const tourData = initialPrograms.find((program) => program.id === params.slug)

  if (!tourData) {
    return {
      title: "Program Not Found",
      description: "The requested program could not be found.",
    }
  }

  return {
    title: tourData.title,
    description: tourData.description,
    openGraph: {
      title: tourData.title,
      description: tourData.description,
      images: [tourData.coverImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tourData.title,
      description: tourData.description,
      images: [tourData.coverImage],
    },
  }
}

export default function TourStudySlugPage({ params }: TourStudySlugPageProps) {
  const tourData = initialPrograms.find((program) => program.id === params.slug)
  const universityData = initialUniversities.find((university) => university.aka === tourData?.university)

  if (!tourData || !universityData)
    return (
      <React.Fragment>
        <div className="border-grid border-b">
          <div className="container-wrapper">
            <div className="container py-4 xl:py-6 2xl:py-4">
              <div>
                <h1>Tour Not found!</h1>
                <p>An error occurs, please try again.</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/tours/study">Go back</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto grid min-h-svh items-center">
          <div>Not Found!</div>
        </div>
      </React.Fragment>
    )

  const relatedPrograms = initialPrograms
    .filter(
      (program) =>
        program.id !== tourData.id && (program.university === tourData.university || program.type === tourData.type)
    )
    .slice(0, 3)

  const structuredData = generateStructuredData(tourData)

  return (
    <div className="border-grid border-b">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="container-wrapper">
        <div className="container py-8">
          <main>
            <article>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ImageGallery images={[tourData.coverImage, ...universityData.images]} />
                <TourInfo tourData={tourData} />
              </div>

              <Tabs defaultValue="itinerary" className="mt-12">
                <ScrollArea>
                  <TabsList className="before:bg-border relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px">
                    <TabsTrigger
                      value="included"
                      className="border-border bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <Box className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                      ภาพรวม
                    </TabsTrigger>
                    <TabsTrigger
                      value="itinerary"
                      className="border-border bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <PanelsTopLeft
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      แผนการเรียน
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="border-border bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
                    >
                      <Box className="-ms-0.5 me-1.5 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
                      รีวิว
                    </TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="included">
                  <section className="space-y-6">
                    <h2 className="text-3xl font-semibold tracking-tight">เกี่ยวกับมหาวิทยาลัย</h2>

                    <div className="space-y-4">
                      {universityData.about.map((section, index) => (
                        <div key={index} className="space-y-2">
                          <h3 className="font-medium">{section.title}:</h3>
                          <ul className="space-y-2">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="pl-4">
                                - {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="itinerary">
                  <section className="space-y-8">
                    {tourData.itinerary.length === 0 ? (
                      <div className="py-12 text-center">
                        <p className="text-muted-foreground">
                          ช่วงเวลาการรับสมัคร 1-2 เดือนก่อนเดินทาง วันและเวลาเดินทางสอบถามกับทางบริษัทอีกครั้ง
                        </p>
                      </div>
                    ) : (
                      tourData.itinerary.map((week) => (
                        <div key={week.week} className="relative border-l-2 border-gray-200 pb-8 pl-8 last:pb-0">
                          <div className="bg-primary absolute left-[-9px] top-0 size-4 rounded-full" />
                          <div className="flex flex-col gap-4">
                            <div>
                              <h3 className="font-semibold">
                                {week.week}: {week.title}
                              </h3>
                              <p className="text-muted-foreground">{week.description}</p>
                            </div>
                            <ul className="space-y-2">
                              {week.activities.map((activity, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <Activity className="text-primary size-4" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))
                    )}
                  </section>
                </TabsContent>

                <TabsContent value="reviews">
                  <section className="py-12 text-center">
                    <p className="text-muted-foreground">Reviews coming soon...</p>
                  </section>
                </TabsContent>
              </Tabs>

              <RelatedPrograms programs={relatedPrograms} />
            </article>
          </main>
        </div>
      </div>
    </div>
  )
}
