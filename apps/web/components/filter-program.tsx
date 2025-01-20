"use client"

import { seasonNames } from "@/utils/formatters"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Filter, Plus } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@workspace/ui/components/accordion"
import { Button } from "@workspace/ui/components/button"
import { DualRangeSlider } from "@workspace/ui/components/dual-range-slider"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
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

import { ProgramType, Season } from "@/types/program"
import { usePrograms } from "@/hooks/use-programs"

export function FilterProgram() {
  const { filters, setFilters, applyFilters } = usePrograms()

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    value: "min" | "max"
  ) {
    const newValue = e.target.value
    if (newValue === "" || /^-?\d*\.?\d*$/.test(newValue)) {
      setFilters({
        ...filters,
        priceRange: {
          min: value === "min" ? +newValue : filters.priceRange.min,
          max: value === "max" ? +newValue : filters.priceRange.max,
        },
      })
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>กรองแพ็คเกจทัวร์เรียน</SheetTitle>
          <SheetDescription>
            กรองแพ็คเกจเรียนตามความต้องการของคุณ
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-2">
          <h3 className="text-left text-[15px] font-semibold leading-6">
            ช่วงราคา
          </h3>
          <div className="pt-4">
            <DualRangeSlider
              min={0}
              max={100000}
              step={1000}
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={([min, max]) =>
                setFilters({
                  ...filters,
                  priceRange: { min: min!, max: max! },
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
                    value={filters.priceRange.min}
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
                    value={filters.priceRange.max}
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
                  defaultValue="all"
                  onValueChange={(value: ProgramType | "all") =>
                    setFilters({ ...filters, type: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r1" />
                    <Label htmlFor="r1">ทั้งหมด</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short" id="r2" />
                    <Label htmlFor="r2">เรียนระยะสั้น</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="long" id="r3" />
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
                  defaultValue="all"
                  onValueChange={(value) =>
                    setFilters({ ...filters, university: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="radio-university-all" />
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
                    defaultValue="0"
                    onValueChange={(value) =>
                      setFilters({ ...filters, month: Number(value) })
                    }
                  >
                    {[
                      "ทั้งหมด",
                      "มกราคม",
                      "กุมภาพันธ์",
                      "มีนาคม",
                      "เมษายน",
                      "พฤษภาคม",
                      "มิถุนายน",
                      "กรกฎาคม",
                      "สิงหาคม",
                      "กันยายน",
                      "ตุลาคม",
                      "พฤศจิกายน",
                      "ธันวาคม",
                    ].map((month, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`radio-month-${index + 1}`}
                        />
                        <Label
                          htmlFor={`radio-month-${index + 1}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {month}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </ScrollArea>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="4" className="py-2">
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
                  defaultValue="all"
                  onValueChange={(value: Season) =>
                    setFilters({ ...filters, season: value })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="radio-season-all" />
                    <Label
                      htmlFor="radio-season-all"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      ทั้งหมด
                    </Label>
                  </div>
                  {Object.entries(seasonNames).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={value}
                        id={`radio-season-${key}`}
                      />
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

        <SheetFooter>
          <Button onClick={applyFilters}>ยืนยันการกรอง</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
