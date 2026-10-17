import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import nodemailer from "nodemailer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().optional().default("New Portfolio Message"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

const RECIPIENT_EMAIL = "mengistuabawa19@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // 1. Persist the message in SQLite database via Prisma
    let savedRecord = null;
    try {
      savedRecord = await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject: subject || "Portfolio Contact Message",
          message,
        },
      });
    } catch (dbErr) {
      console.warn("Could not persist message in SQLite, continuing with email delivery:", dbErr);
    }

    // 2. Send email via Nodemailer if SMTP credentials are provided
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let emailSent = false;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${smtpUser}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `[Portfolio Inquiry] ${subject || "New Message"} from ${name}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #4f46e5; margin-top: 0;">New Message from Portfolio Visitor</h2>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p><strong>From:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
              <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #6366f1; border-radius: 6px;">
                <p style="margin: 0; white-space: pre-wrap; color: #1e293b; line-height: 1.6;">${message}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #64748b;">
                You can reply directly to this email to respond to ${name} at ${email}.
              </p>
            </div>
          `,
          text: `New Portfolio Message\n\nFrom: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
        });

        emailSent = true;
      } catch (mailErr) {
        console.error("Nodemailer failed to dispatch email:", mailErr);
      }
    } else {
      // In development or when SMTP is not set, log message
      console.log(`[Contact Form Received] From: ${name} <${email}> | Message: ${message}`);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        deliveredViaSmtp: emailSent,
        id: savedRecord?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API handler error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while sending message." },
      { status: 500 }
    );
  }
}
