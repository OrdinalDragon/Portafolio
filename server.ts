import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Middleware to allow framing (needed for AI Studio and nested PDFs)
  app.use((req, res, next) => {
    // Be very permissive to allow PDF rendering and framing
    res.setHeader("Content-Security-Policy", "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; frame-src * data: blob:; frame-ancestors *;");
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    console.log("Recibida petición en /api/contact:", req.body);
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Configure the transporter
      // Note: For Gmail, you usually need an App Password
      // Sanitize host to remove protocols and ensure correct Gmail SMTP host
      let rawHost = process.env.SMTP_HOST || "smtp.gmail.com";
      let cleanHost = rawHost.replace(/^(?:[a-zA-Z]+:)?\/\//, "");
      
      // If the user just put "gmail.com", correct it to "smtp.gmail.com"
      if (cleanHost.toLowerCase() === "gmail.com") {
        cleanHost = "smtp.gmail.com";
      }

      const transporter = nodemailer.createTransport({
        host: cleanHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${email}" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL || "ngsrepresentaciones@gmail.com",
        subject: `[DragonStack Contact] ${subject}`,
        text: `From: ${email}\n\nMessage:\n${message}`,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Specific route for PDF files to ensure correct headers
  app.get("/*.pdf", (req, res, next) => {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    next();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
