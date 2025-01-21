import { MainNavItem, TourNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  tourNav: TourNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    { href: "/", title: "หน้าแรก" },
    { href: "/tours/study", title: "แพ็คเกจเรียน" },
    { href: "/about", title: "เกี่ยวกับเรา" },
    { href: "/contact", title: "ติดต่อเรา" },
  ],
  tourNav: [
    {
      title: "แพ็คเกจเรียน",
      items: [
        {
          title: "แพ็คเกจเรียนระยะสั้น",
          href: "/tours/study?type=SHORT",
          items: [],
        },
        {
          title: "แพ็คเกจเรียนระยะยาว",
          href: "/tours/study?type=LONG",
          items: [],
        },
      ],
    },
  ],
}
