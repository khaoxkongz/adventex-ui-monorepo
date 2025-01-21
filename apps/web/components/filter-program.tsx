"use client"

import * as React from "react"
import { monthNames, seasonNames } from "@/utils/formatters"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Filter, Plus } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem } from "@workspace/ui/components/accordion"
import { Button } from "@workspace/ui/components/button"
import { DualRangeSlider } from "@workspace/ui/components/dual-range-slider"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"

import { type Month } from "@/types/program"
import { usePrograms } from "@/hooks/use-programs"

export const FilterProgram = React.memo(() => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { filters, setFilters, applyFilters, activeFiltersCount, resetFilters } = usePrograms()

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, value: "min" | "max") {
    const newValue = e.target.value
    if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
      setFilters({
        ...filters,
        [`${value}Price`]: +newValue,
      })
    }
  }

  function handleApplyFilters() {
    applyFilters()
    setIsOpen(false)
  }

  function handleResetFilters() {
    resetFilters()
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Filter className="size-4" />
          {activeFiltersCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between gap-4">
        <SheetHeader>
          <SheetTitle>กรองแพ็คเกจทัวร์เรียน</SheetTitle>
          <SheetDescription>กรองแพ็คเกจเรียนตามความต้องการของคุณ</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-2">
            <h3 className="text-left text-[15px] font-semibold leading-6">ช่วงราคา</h3>
            <div className="pt-4">
              <DualRangeSlider
                min={0}
                max={200000}
                step={1000}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) =>
                  setFilters({
                    ...filters,
                    minPrice: +min!,
                    maxPrice: +max!,
                  })
                }
              />
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label htmlFor="min-price">Min price</Label>
                  <div className="relative">
                    <Input
                      id="min-price"
                      className="peer w-full ps-6"
                      type="text"
                      inputMode="numeric"
                      value={filters.minPrice}
                      onChange={(e) => handleInputChange(e, "min")}
                      // onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     validateAndUpdateValue(inputValues[0], 0)
                      //   }
                      // }}
                      aria-label="Enter minimum price"
                    />
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                      $
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="max-price">Max price</Label>
                  <div className="relative">
                    <Input
                      id="max-price"
                      className="peer w-full ps-6"
                      type="text"
                      inputMode="numeric"
                      value={filters.maxPrice}
                      onChange={(e) => handleInputChange(e, "max")}
                      // onBlur={() => validateAndUpdateValue(inputValues[1], 1)}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     validateAndUpdateValue(inputValues[1], 1)
                      //   }
                      // }}
                      aria-label="Enter maximum price"
                    />
                    <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                      $
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Accordion type="multiple" className="w-full" defaultValue={["1"]}>
            <AccordionItem value="1" className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  กิจกรรม
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground pb-2">
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue={filters.duration}
                    onValueChange={(value: "ALL" | "SHORT" | "LONG") => setFilters({ ...filters, duration: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ALL" id="r1" />
                      <Label htmlFor="r1">ทั้งหมด</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="SHORT" id="r2" />
                      <Label htmlFor="r2">เรียนระยะสั้น</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="LONG" id="r3" />
                      <Label htmlFor="r3">เรียนระยะยาว</Label>
                    </div>
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  มหาวิทยาลัย
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground pb-2">
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue={filters.university}
                    onValueChange={(value: "ALL" | "HIT" | "HNU") => setFilters({ ...filters, university: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ALL" id="radio-university-all" />
                      <Label
                        htmlFor="radio-university-all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        ทั้งหมด
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HIT" id="radio-university-hit" />
                      <Label
                        htmlFor="radio-university-hit"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Harbin Institute of Technology
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HNU" id="radio-university-hnu" />
                      <Label
                        htmlFor="radio-university-hnu"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Harbin Normal University
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  เดือน
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground pb-2">
                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    <RadioGroup
                      defaultValue={filters.month}
                      onValueChange={(value: "ALL" | Month) => setFilters({ ...filters, month: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ALL" id="radio-month-all" />
                        <Label
                          htmlFor="radio-month-all"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          ทั้งหมด
                        </Label>
                      </div>
                      {Object.entries(monthNames).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <RadioGroupItem value={key} id={`radio-month-${key}`} />
                          <Label
                            htmlFor={`radio-month-${key}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="4" className="border-none py-2">
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                  ฤดูกาล
                  <Plus
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-muted-foreground pb-2">
                <div className="space-y-4">
                  <RadioGroup
                    defaultValue={filters.season}
                    onValueChange={(value: "ALL" | "SPRING" | "SUMMER" | "AUTUMN" | "WINTER") =>
                      setFilters({ ...filters, season: value })
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ALL" id="radio-season-all" />
                      <Label
                        htmlFor="radio-season-all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        ทั้งหมด
                      </Label>
                    </div>
                    {Object.entries(seasonNames).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <RadioGroupItem value={key} id={`radio-season-${key}`} />
                        <Label
                          htmlFor={`radio-season-${key}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {value}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ScrollArea>

        <SheetFooter className="border-t pt-4">
          <Button variant="ghost" onClick={handleResetFilters}>
            ล้างค่าการกรอง
          </Button>
          <Button onClick={handleApplyFilters}>ยืนยันการกรอง</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
})
FilterProgram.displayName = "FilterProgram"
