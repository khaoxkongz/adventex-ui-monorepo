export const getGridClass = (layout: "grid" | "list") => {
  return layout === "grid"
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1"
}

export const getMonthName = (month: number) => {
  switch (month) {
    case 1:
      return "JANUARY"
    case 2:
      return "FEBRUARY"
    case 3:
      return "MARCH"
    case 4:
      return "APRIL"
    case 5:
      return "MAY"
    case 6:
      return "JUNE"
    case 7:
      return "JULY"
    case 8:
      return "AUGUST"
    case 9:
      return "SEPTEMBER"
    case 10:
      return "OCTOBER"
    case 11:
      return "NOVEMBER"
    case 12:
      return "DECEMBER"
    default:
      return "ALL"
  }
}

export const monthNames = {
  JANUARY: "มกราคม",
  FEBRUARY: "กุมภาพันธ์",
  MARCH: "มีนาคม",
  APRIL: "เมษายน",
  MAY: "พฤษภาคม",
  JUNE: "มิถุนายน",
  JULY: "กรกฎาคม",
  AUGUST: "สิงหาคม",
  SEPTEMBER: "กันยายน",
  OCTOBER: "ตุลาคม",
  NOVEMBER: "พฤศจิกายน",
  DECEMBER: "ธันวาคม",
} as const

export const seasonNames = {
  SPRING: "ฤดูใบไม้ผลิ",
  SUMMER: "ฤดูร้อน",
  AUTUMN: "ฤดูใบไม้ร่วง",
  WINTER: "ฤดูหนาว",
} as const
