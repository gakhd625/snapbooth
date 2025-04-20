import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up API routes
  app.get("/api/stickers", async (req, res) => {
    try {
      const stickers = await storage.getAllStickers();
      res.json(stickers);
    } catch (error) {
      console.error("Error fetching stickers:", error);
      res.status(500).json({ message: "Failed to fetch stickers" });
    }
  });

  // Add feedback route
  app.post("/api/feedback", async (req, res) => {
    try {
      // Validate the request body against the schema
      const validatedData = insertFeedbackSchema.parse(req.body);
      
      // Store the feedback
      const feedback = await storage.addFeedback(validatedData);
      
      res.status(201).json({ 
        message: "Feedback received successfully",
        feedback
      });
    } catch (error) {
      console.error("Error processing feedback:", error);
      
      if (error instanceof z.ZodError) {
        // Handle validation errors
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
