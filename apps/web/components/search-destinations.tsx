"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getMonthName } from "@/utils/formatters"
import { format } from "date-fns"
import { th } from "date-fns/locale"
import { CalendarIcon, Search } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@workspace/ui/components/button"
import { Calendar } from "@workspace/ui/components/calendar"
import { Label } from "@workspace/ui/components/label"
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import ShineBorder from "@workspace/ui/components/shine-border"
import { cn } from "@workspace/ui/lib/utils"

export function SearchDestinations() {
  const router = useRouter()
  const [filters, setFilters] = React.useState({ university: "all" })

  const [date, setDate] = React.useState<DateRange | undefined>()

  function handleDateSelect(selectedDate: DateRange | undefined) {
    setDate(selectedDate)
  }

  function formatThaiDate(date: Date) {
    return format(date, "dd MMMM", { locale: th })
  }

  function handleSearch() {
    const queryParams = new URLSearchParams()

    if (filters.university !== "all") {
      queryParams.append("university", filters.university)
    }

    if (date?.from) {
      const startMonth = date.from.getMonth() + 1
      const monthName = getMonthName(startMonth)
      queryParams.append("month", monthName)
    }

    router.push(`/tours/study?${queryParams.toString()}`)
  }

  return (
    <ShineBorder
      className="bg-background relative z-10 size-full overflow-hidden rounded-lg border p-4 sm:p-6 md:p-8"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label className="block text-sm font-medium">ปลายทาง</Label>
          <Select value={filters.university} onValueChange={(value) => setFilters({ ...filters, university: value })}>
            <SelectTrigger className="w-full shadow-none">
              <SelectValue placeholder="เลือกปลายทาง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="HIT">Harbin Institute of Technology</SelectItem>
              <SelectItem value="HNU">Harbin Normal University</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="block text-sm font-medium">แพ็คเกจ</Label>
          <Select>
            <SelectTrigger className="w-full shadow-none">
              <SelectValue placeholder="เลือกแพ็คเกจที่ต้องการ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="study">แพ็คเกจเรียน</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="block text-sm font-medium">วันเดินทาง</Label>
          <div className="grid gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date ? "text-muted-foreground" : "")}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {formatThaiDate(date.from)} - {formatThaiDate(date.to)}
                      </>
                    ) : (
                      formatThaiDate(date.from)
                    )
                  ) : (
                    <span>เลือกวันที่คาดว่าจะเดินทาง</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 shadow-none" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={2}
                  locale={th}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex items-end">
          <Button className="w-full" size="lg" onClick={handleSearch}>
            <Search className="mr-2 size-4" /> ค้นหา
          </Button>
        </div>
      </div>
    </ShineBorder>
  )
}
