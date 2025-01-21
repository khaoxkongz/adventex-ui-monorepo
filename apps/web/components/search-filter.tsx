"use client"

import { LayoutGrid, List } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { cn } from "@workspace/ui/lib/utils"

import { usePrograms } from "@/hooks/use-programs"
import { FilterProgram } from "@/components/filter-program"

export function SearchFilter() {
  const { layout, setLayout, order, setOrder, filteredPrograms } = usePrograms()

  return (
    <div className="bg-background sticky top-0 z-50 shadow">
      <div className="container-wrapper">
        <div className="container">
          <div
            className={cn(
              "flex flex-col gap-4 py-4",
              "sm:flex-row sm:items-center sm:justify-between sm:py-6"
            )}
          >
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">ค้นหาแพ็คเกจ</h2>
              <p className="text-muted-foreground text-sm">
                พบทั้งหมด {filteredPrograms.length} ทัวร์
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <Label className="text-muted-foreground text-sm">
                  เรียงตาม
                </Label>
                <Select
                  value={order}
                  onValueChange={(value: "ASC" | "DESC") => setOrder(value)}
                >
                  <SelectTrigger className="sm:w-[140px]">
                    <SelectValue placeholder="เรียงตาม" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASC">ราคาต่ำ-สูง</SelectItem>
                    <SelectItem value="DESC">ราคาสูง-ต่ำ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-sm">กรอง</Label>
                <FilterProgram />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-sm">โหมด</Label>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayout("grid")}
                    className={
                      layout === "grid"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    <LayoutGrid className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLayout("list")}
                    className={
                      layout === "list"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    <List className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
