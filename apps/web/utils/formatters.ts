export const getGridClass = (layout: "grid" | "list") => {
  return layout === "grid"
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : "grid-cols-1"
}

export const seasonNames: Record<
  "spring" | "summer" | "autumn" | "winter",
  string
> = {
  spring: "ฤดูใบไม้ผลิ",
  summer: "ฤดูร้อน",
  autumn: "ฤดูใบไม้ร่วง",
  winter: "ฤดูหนาว",
}
