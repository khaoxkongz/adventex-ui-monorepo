export type Layout = "grid" | "list"

export type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER"

export interface FilterState {
  type: "ALL" | "STUDY" | "TRAVEL"
  duration: "ALL" | "SHORT" | "LONG"
  university: "ALL" | "HIT" | "HNU"
  season: "ALL" | "SPRING" | "SUMMER" | "AUTUMN" | "WINTER"
  month: "ALL" | Month
  minPrice: number
  maxPrice: number
  sortBy: {
    key: "price" | "duration"
    order: "ASC" | "DESC"
  }
}

export interface Program {
  id: string
  tourCode: string
  title: string
  description: string
  location: string
  type: "STUDY" | "TRAVEL"
  duration: "SHORT" | "LONG"
  season: "SPRING" | "SUMMER" | "AUTUMN" | "WINTER"
  university: "HIT" | "HNU"
  startDate: string | undefined
  endDate: string | undefined
  period: string
  coverImage: string
  highlights: string[]
  availableDate: Month[]
  defaultPrice: number
  rooms: {
    name: string
    price: number
  }[]
  itinerary: {
    week: string
    title: string
    description: string
    activities: string[]
  }[]
}
