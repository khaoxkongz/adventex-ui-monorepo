"use server"

import { Resend } from "resend"
import { z, ZodError } from "zod"

import AutoReplyEmail from "@workspace/transactional/emails/auto-reply-email"
import ContactFormEmail from "@workspace/transactional/emails/contact-form"

import { env } from "@/env/server"
import { contactFormSchema } from "@/lib/validations"

const resend = new Resend(env.RESEND_API_KEY)

export async function contactFormAction(_prevState: unknown, formData: FormData) {
  const defaultValues = z.record(z.string(), z.string()).parse(Object.fromEntries(formData.entries()))

  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })

  try {
    const data = contactFormSchema.parse(Object.fromEntries(formData))

    const { data: emailData, error } = await resend.emails.send({
      from: "Adventex Contact Form <onboarding@resend.dev>",
      to: "kong.thanapat1@gmail.com",
      subject: `${data.subject}`,
      react: ContactFormEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submittedAt,
      }),
    })

    if (error) {
      console.error("Error sending email:", error)
      return {
        defaultValues,
        success: false,
        errors: {
          form: "Failed to send email. Please try again later.",
        },
      }
    }

    console.log("Email sent successfully:", emailData)

    await sendAutoReply(data.name, data.email)

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
    if (error instanceof ZodError) {
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

async function sendAutoReply(name: string, email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Adventex Support <kong.thanapat1@gmail.com>",
      to: email,
      subject: "Thank you for contacting Adventex",
      react: AutoReplyEmail({ name }),
    })

    if (error) {
      console.error("Error sending auto-reply:", error)
    }

    console.log("Auto-reply sent successfully:", data)
  } catch (error) {
    console.error("Unexpected error sending auto-reply:", error)
  }
}
