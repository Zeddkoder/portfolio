import { z } from "zod";

// User schema - removed pgTable definitions for local development
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Manually define User type without Drizzle since we're not using a database
export type User = {
  id: number;
  username: string;
  password: string;
};

// Contact messages schema - simplified for in-memory usage
export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Manually define ContactMessage type
export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};
