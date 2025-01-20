import { z } from "zod"

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" })
    .max(32, { message: "ชื่อต้องไม่เกิน 32 ตัวอักษร" }),
  email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
  subject: z
    .string()
    .min(2, { message: "หัวข้อต้องมีอย่างน้อย 2 ตัวอักษร" })
    .max(32, { message: "หัวข้อต้องไม่เกิน 32 ตัวอักษร" }),
  message: z
    .string()
    .min(10, { message: "ข้อความต้องมีอย่างน้อย 10 ตัวอักษร" })
    .max(1000, { message: "ข้อความต้องไม่เกิน 1000 ตัวอักษร" }),
})
