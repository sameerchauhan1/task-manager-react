import express from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
   console.log(`${req.method} ${req.url}`);
   next();
});


//Test
app.get("/", (req, res) => {
   res.send("Hello World");
});



// Create a new task
app.post("/api/tasks", async (req, res) => {
   const { title, priority } = req.body;
   console.log("Received task creation request:", req.body);
   try {
      const task = await prisma.task.create({
         data: { title, priority: priority || 1 },
      });
      res.json(task);
   } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
         error: "An error occurred while creating the task",
      });
   }
});

// Get all tasks
app.get("/api/tasks", async (req, res) => {
   try {
      const tasks = await prisma.task.findMany();
      res.json(tasks);
   } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "An error occurred while fetching tasks" });
   }
});

// Update a task
app.put("/api/tasks/:id", async (req, res) => {
   const { id } = req.params;
   const { title, completed, priority } = req.body;
   try {
      const task = await prisma.task.update({
         where: { id: parseInt(id) },
         data: { title, completed, priority },
      });
      res.json(task);
   } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({
         error: "An error occurred while updating the task",
      });
   }
});

// Delete a task
app.delete("/api/tasks/:id", async (req, res) => {
   const { id } = req.params;
   try {
      await prisma.task.delete({
         where: { id: parseInt(id) },
      });
      res.json({ message: "Task deleted" });
   } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
         error: "An error occurred while deleting the task",
      });
   }
});

// Search tasks
app.get("/api/tasks/search", async (req, res) => {
   const { query } = req.query;
   try {
      const tasks = await prisma.task.findMany({
         where: {
            title: {
               contains: query,
               mode: "insensitive",
            },
         },
      });
      res.json(tasks);
   } catch (error) {
      console.error("Error searching tasks:", error);
      res.status(500).json({
         error: "An error occurred while searching tasks",
      });
   }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));