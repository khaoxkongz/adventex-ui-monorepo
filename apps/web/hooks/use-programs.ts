"use client"

import { useCallback, useEffect, useState } from "react"
import { initialPrograms } from "@/data/programs"
import {
  parseAsInteger,
  useQueryState,
  useQueryStates,
  type UrlKeys,
} from "nuqs"

import { FilterState, Program } from "@/types/program"

export function usePrograms() {
  const [layout, setLayout] = useQueryState("layout", { defaultValue: "grid" })
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const [sortBy, setSortBy] = useQueryState("sort", { defaultValue: "price" })

  const [tempFilters, setTempFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 100000 },
    type: "all",
    university: "all",
    season: "all",
    month: 0,
  })

  const priceRange = {
    minPrice: parseAsInteger.withDefault(0),
    maxPrice: parseAsInteger.withDefault(100000),
  }

  const priceRangeUrlKeys: UrlKeys<typeof priceRange> = {
    minPrice: "min",
    maxPrice: "max",
  }

  const [{ minPrice, maxPrice }, setPriceRange] = useQueryStates(priceRange, {
    urlKeys: priceRangeUrlKeys,
  })

  const [type, setType] = useQueryState("type", { defaultValue: "all" })
  const [university, setUniversity] = useQueryState("university", {
    defaultValue: "all",
  })
  const [season, setSeason] = useQueryState("season", { defaultValue: "all" })
  const [month, setMonth] = useQueryState(
    "month",
    parseAsInteger.withDefault(0)
  )

  const [programs] = useState<Program[]>(initialPrograms)
  const [filteredPrograms, setFilteredPrograms] = useState(programs)

  useEffect(() => {
    setTempFilters({
      priceRange: { min: minPrice, max: maxPrice },
      type: type as FilterState["type"],
      university: university,
      season: season as FilterState["season"],
      month: month,
    })
  }, [minPrice, maxPrice, type, university, season, month])

  const setFilters = useCallback((newFilters: FilterState) => {
    setTempFilters(newFilters)
  }, [])

  const applyFilters = useCallback(() => {
    setPriceRange({
      minPrice: tempFilters.priceRange.min,
      maxPrice: tempFilters.priceRange.max,
    })
    setType(tempFilters.type)
    setUniversity(tempFilters.university)
    setSeason(tempFilters.season)
    setMonth(tempFilters.month)
    setCurrentPage(1)
  }, [
    tempFilters,
    setPriceRange,
    setType,
    setUniversity,
    setSeason,
    setMonth,
    setCurrentPage,
  ])

  useEffect(() => {
    const filtered = programs.filter((program) => {
      if (program.defaultPrice < minPrice || program.defaultPrice > maxPrice)
        return false
      if (type !== "all" && program.type !== type) return false
      if (university !== "all" && program.university !== university)
        return false
      if (season !== "all" && program.season !== season) return false
      if (month !== 0 && program.month !== Number(month)) return false
      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price") {
        return a.defaultPrice - b.defaultPrice
      } else {
        return a.month - b.month
      }
    })

    setFilteredPrograms(sorted)
  }, [programs, minPrice, maxPrice, type, university, season, sortBy, month])

  return {
    layout,
    setLayout,
    currentPage,
    setCurrentPage,
    programs,
    filters: tempFilters,
    setFilters,
    filteredPrograms,
    sortBy,
    setSortBy,
    applyFilters,
  }
}
