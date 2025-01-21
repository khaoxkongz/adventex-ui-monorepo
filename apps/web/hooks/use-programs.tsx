"use client"

import * as React from "react"
import { initialPrograms } from "@/data/programs"
import {
  parseAsInteger,
  useQueryState,
  useQueryStates,
  type UrlKeys,
} from "nuqs"

import { FilterState, Month, Program } from "@/types/program"

export function usePrograms() {
  const [layout, setLayout] = useQueryState("layout", { defaultValue: "grid" })
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )

  const priceRange = {
    minPrice: parseAsInteger.withDefault(0),
    maxPrice: parseAsInteger.withDefault(200000),
  }

  const priceRangeUrlKeys: UrlKeys<typeof priceRange> = {
    minPrice: "min_price",
    maxPrice: "max_price",
  }

  const [{ minPrice, maxPrice }, setPriceRange] = useQueryStates(priceRange, {
    urlKeys: priceRangeUrlKeys,
  })

  const [type, setType] = useQueryState<"ALL" | "STUDY" | "TRAVEL">("type", {
    defaultValue: "ALL",
    parse: (value) => value as "ALL" | "STUDY" | "TRAVEL",
  })
  const [duration, setduration] = useQueryState<"ALL" | "SHORT" | "LONG">(
    "duration",
    {
      defaultValue: "ALL",
      parse: (value) => value as "ALL" | "SHORT" | "LONG",
    }
  )
  const [university, setUniversity] = useQueryState<"ALL" | "HIT" | "HNU">(
    "university",
    {
      defaultValue: "ALL",
      parse: (value) => value as "ALL" | "HIT" | "HNU",
    }
  )
  const [month, setMonth] = useQueryState<"ALL" | Month>("month", {
    defaultValue: "ALL",
    parse: (value) => value as "ALL" | Month,
  })
  const [season, setSeason] = useQueryState<
    "ALL" | "SPRING" | "SUMMER" | "AUTUMN" | "WINTER"
  >("season", {
    defaultValue: "ALL",
    parse: (value) =>
      value as "ALL" | "SPRING" | "SUMMER" | "AUTUMN" | "WINTER",
  })
  const [order, setOrder] = useQueryState<"ASC" | "DESC">("order", {
    defaultValue: "ASC",
    parse: (value) => value as "ASC" | "DESC",
  })

  const [programs] = React.useState<Program[]>(initialPrograms)
  const [filteredPrograms, setFilteredPrograms] = React.useState(programs)

  const [tempFilters, setTempFilters] = React.useState<FilterState>({
    type: "ALL",
    duration: "ALL",
    university: "ALL",
    season: "ALL",
    month: "ALL",
    minPrice: 0,
    maxPrice: 200000,
    sortBy: {
      key: "price",
      order: order,
    },
  })

  React.useEffect(() => {
    setTempFilters({
      type,
      duration,
      university,
      season,
      month,
      minPrice,
      maxPrice,
      sortBy: {
        key: "price",
        order: order,
      },
    })
  }, [type, duration, university, season, month, minPrice, maxPrice, order])

  const setFilters = React.useCallback((newFilters: FilterState) => {
    setTempFilters(newFilters)
  }, [])

  const applyFilters = React.useCallback(() => {
    setType(tempFilters.type)
    setduration(tempFilters.duration)
    setUniversity(tempFilters.university)
    setSeason(tempFilters.season)
    setMonth(tempFilters.month)
    setPriceRange({
      minPrice: tempFilters.minPrice,
      maxPrice: tempFilters.maxPrice,
    })
    setCurrentPage(1)
  }, [
    tempFilters,
    setType,
    setduration,
    setUniversity,
    setSeason,
    setMonth,
    setPriceRange,
    setCurrentPage,
  ])

  const resetFilters = React.useCallback(() => {
    setType("ALL")
    setduration("ALL")
    setUniversity("ALL")
    setSeason("ALL")
    setMonth("ALL")
    setPriceRange({ minPrice: 0, maxPrice: 200000 })
    setCurrentPage(1)
  }, [
    setType,
    setduration,
    setUniversity,
    setSeason,
    setMonth,
    setPriceRange,
    setCurrentPage,
  ])

  React.useEffect(() => {
    const filtered = programs.filter((program) => {
      if (type !== "ALL" && program.type !== type) return false
      if (duration !== "ALL" && program.duration !== duration) return false
      if (university !== "ALL" && program.university !== university)
        return false
      if (season !== "ALL" && program.season !== season) return false
      if (month !== "ALL" && !program.availableDate.includes(month))
        return false
      if (program.defaultPrice < minPrice || program.defaultPrice > maxPrice)
        return false
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      if (order === "ASC") return a.defaultPrice - b.defaultPrice
      return b.defaultPrice - a.defaultPrice
    })

    setFilteredPrograms(sorted)
  }, [
    programs,
    type,
    duration,
    university,
    season,
    month,
    maxPrice,
    minPrice,
    order,
  ])

  return {
    layout,
    setLayout,
    currentPage,
    setCurrentPage,
    programs,
    filters: tempFilters,
    setFilters,
    filteredPrograms,
    order,
    setOrder,
    applyFilters,
    resetFilters,
  }
}
