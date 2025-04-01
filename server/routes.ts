import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

// Configure nodemailer with a test account for development
// In production, you would use real email credentials
let transporter: nodemailer.Transporter;

async function setupMailer() {
  // Create a test account if in development
  if (process.env.NODE_ENV !== "production") {
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    // Use production email service
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER || "user@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize nodemailer
  await setupMailer();

  // API endpoint to handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // Send email
      const mailOptions = {
        from: email,
        to: "sewanou.landjeli@gmail.com", // Replace with your email
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h3>New Message from Portfolio Contact Form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      };
      
      const info = await transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV !== "production") {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // API endpoint to download the CV
  app.get("/api/download-cv", (req, res) => {
    // This is a placeholder for the actual resume file
    // In a real implementation, you would have the actual PDF file
    const resumePath = path.join(__dirname, "../attached_assets/resume.pdf");
    
    // Check if the file exists
    if (fs.existsSync(resumePath)) {
      res.download(resumePath, "Sewanou_Landjeli_CV.pdf");
    } else {
      // If the file doesn't exist, generate a simple PDF instead
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=Sewanou_Landjeli_CV.pdf");
      
      // For now, just send an error message
      res.status(404).json({ message: "Resume file not found" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
