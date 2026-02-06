import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getPostHogClient } from "@/lib/posthog-server"

export async function POST(request: Request) {
  const posthog = getPostHogClient()

  try {
    const body = await request.json()
    const { name, companyName, country, contactNumber, email, message, captchaToken } = body

    // Verify reCAPTCHA
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    })
    const recaptchaData = await recaptchaRes.json()

    if (!recaptchaData.success) {
      posthog.capture({
        distinctId: email || 'anonymous',
        event: 'form_submission_error',
        properties: {
          error_type: 'recaptcha_failed',
          source: 'server',
        },
      })
      return NextResponse.json({ message: "reCAPTCHA verification failed" }, { status: 400 })
    }

    // Send email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"SIU Website" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold">Name</td><td style="padding:8px">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${companyName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Country</td><td style="padding:8px">${country}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Contact Number</td><td style="padding:8px">${contactNumber}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold">Message</td><td style="padding:8px">${message || "—"}</td></tr>
        </table>
      `,
    })

    // Track successful form submission server-side
    posthog.capture({
      distinctId: email,
      event: 'form_submission_success',
      properties: {
        country,
        has_message: Boolean(message),
        source: 'server',
      },
    })

    return NextResponse.json({ message: "successful" })
  } catch (error) {
    console.error("sendForm error:", error)
    posthog.capture({
      distinctId: 'anonymous',
      event: 'form_submission_error',
      properties: {
        error_type: 'exception',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        source: 'server',
      },
    })
    return NextResponse.json(
      { message: "failed", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
