import { 
  users, 
  stickers, 
  feedback,
  type User, 
  type InsertUser,
  type Sticker,
  type InsertSticker,
  type Feedback,
  type InsertFeedback
} from "@shared/schema";

// Storage interface with additional methods for photobooth app
export interface IStorage {
  // User methods (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Sticker methods
  getAllStickers(): Promise<Sticker[]>;
  getSticker(id: number): Promise<Sticker | undefined>;
  addSticker(sticker: InsertSticker): Promise<Sticker>;
  
  // Feedback methods
  addFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedback(): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stickersCollection: Map<number, Sticker>;
  private feedbackCollection: Map<number, Feedback>;
  private userId: number;
  private stickerId: number;
  private feedbackId: number;

  constructor() {
    this.users = new Map();
    this.stickersCollection = new Map();
    this.feedbackCollection = new Map();
    this.userId = 1;
    this.stickerId = 1;
    this.feedbackId = 1;
    
    // Add default stickers
    this.addDefaultStickers();
  }

  // User methods (kept from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Sticker methods
  async getAllStickers(): Promise<Sticker[]> {
    return Array.from(this.stickersCollection.values());
  }

  async getSticker(id: number): Promise<Sticker | undefined> {
    return this.stickersCollection.get(id);
  }

  async addSticker(insertSticker: InsertSticker): Promise<Sticker> {
    const id = this.stickerId++;
    const sticker: Sticker = { ...insertSticker, id };
    this.stickersCollection.set(id, sticker);
    return sticker;
  }
  
  // Feedback methods
  async addFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackId++;
    const createdAt = new Date();
    const feedback: Feedback = { ...insertFeedback, id, createdAt };
    this.feedbackCollection.set(id, feedback);
    return feedback;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return Array.from(this.feedbackCollection.values());
  }
  
  // Helper to add default stickers
  private async addDefaultStickers() {
    const defaultStickers: InsertSticker[] = [
      { name: "Heart", icon: "bx-heart", color: "pink-500" },
      { name: "Star", icon: "bx-star", color: "purple-500" },
      { name: "Cool", icon: "bx-cool", color: "blue-500" },
      { name: "Party", icon: "bx-party", color: "yellow-500" },
      { name: "Smile", icon: "bx-smile", color: "green-500" }
    ];
    
    for (const sticker of defaultStickers) {
      await this.addSticker(sticker);
    }
  }
}

export const storage = new MemStorage();
