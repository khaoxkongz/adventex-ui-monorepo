"use server"

import { Resend } from "resend"
import { z } from "zod"

import ContactFormEmail from "@workspace/transactional/emails/contact-form"

import { env } from "@/env/server"
import { contactFormSchema } from "@/lib/validations"

const resend = new Resend(env.RESEND_API_KEY)

export async function contactFormAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()))

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData))

    await resend.emails.send({
      from: "Adventex Contact Form <onboarding@resend.dev>",
      to: "support@adventex.co.th",
      subject: `${data.subject}`,
      react: ContactFormEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    })

    return {
      defaultValues: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      success: true,
      errors: null,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        defaultValues,
        success: false,
        errors: Object.fromEntries(
          Object.entries(error.flatten().fieldErrors).map(([key, value]) => [key, value?.join(", ")])
        ),
      }
    }

    return {
      defaultValues,
      success: false,
      errors: {
        form: "Failed to send email. Please try again later.",
      },
    }
  }
}
