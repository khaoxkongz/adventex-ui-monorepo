import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { Icons } from "@/components/icons"

const footerLinks = {
  company: [
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "ติดต่อเรา", href: "/contact" },
  ],
  tours: [
    { label: "แพ็คเกจทั้งหมด", href: "/tours/study" },
    { label: "แพ็คเกจเรียน", href: "/tours/study" },
  ],
}

const socialLinks = [
  {
    icon: Icons.facebook,
    href: "https://web.facebook.com/profile.php?id=61552757897555",
  },
  {
    icon: Icons.instagram,
    href: "https://www.instagram.com/adventexeducation/?hl=en",
  },
  {
    icon: Icons.tiktok,
    href: "https://www.tiktok.com/@harbin.pp",
  },
]

const contactInfo = [
  { icon: Phone, text: "+66 64 213 0656" },
  { icon: Mail, text: "support@advantex.com" },
  { icon: MapPin, text: "121/2 เลขที่ 3 ต.เวียง อ.เชียงแสน จ.เชียงราย 57120" },
]

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-grid border-t py-6 md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
            <aside className="lg:col-span-2">
              <Link
                href="/"
                className="text-primary mb-4 block text-xl font-bold uppercase"
              >
                advantex international group co., ltd.
              </Link>
              <p className="text-muted-foreground mb-6 max-w-[30ch]">
                ทะเบียนพานิชย์เลขที่ 0575567001670
              </p>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="text-muted-foreground flex items-center gap-2"
                  >
                    <item.icon className="size-4" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div>
              <h3 className="mb-4 font-semibold">บริษัท</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">แพ็คเกจ</h3>
              <ul className="space-y-3">
                {footerLinks.tours.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-grid border-t py-6 md:px-8 md:py-0">
        <div className="container-wrapper">
          <div className="container py-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-muted-foreground text-center text-sm sm:text-left">
                © {currentYear} Advantex. All rights reserved.
              </p>

              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
