export type LayoutType = "grid" | "list"

export type ProgramType = "short" | "long"

export type Season = "spring" | "summer" | "autumn" | "winter"

export interface FilterState {
  priceRange: {
    min: number
    max: number
  }
  type: ProgramType | "all"
  university: string
  season: Season | "all"
  month: number
}

export interface Program {
  id: string
  tourCode: string
  title: string
  description: string
  location: string
  type: ProgramType
  season: Season
  university: "HIT" | "HNU"
  month: number
  period: string
  coverImage: string
  images: string[]
  highlights: string[]
  defaultPrice: number
  prices: {
    name: string
    price: number
  }[]
  about: {
    title: string
    items: string[]
  }[]
  itinerary: {
    week: string
    title: string
    description: string
    activities: string[]
  }[]
}
