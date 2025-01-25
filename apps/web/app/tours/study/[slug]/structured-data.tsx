import type { Program } from "@/types/program"

export function generateStructuredData(program: Program) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    name: program.title,
    description: program.description,
    provider: {
      "@type": "Organization",
      name: program.university,
    },
    educationalProgramMode: program.type,
    timeToComplete: program.period,
    startDate: program.startDate,
    endDate: program.endDate,
    offers: {
      "@type": "Offer",
      price: program.defaultPrice,
      priceCurrency: "THB",
    },
  }
}
