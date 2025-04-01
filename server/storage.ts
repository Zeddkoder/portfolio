import { type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private nextId = 1;

  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Create a new user with the generated ID and provided data
    const newUser = {
      id: this.nextId++,
      username: insertUser.username,
      password: insertUser.password
    };
    
    this.users.push(newUser);
    return newUser;
  }
}

export const storage = new MemStorage();
