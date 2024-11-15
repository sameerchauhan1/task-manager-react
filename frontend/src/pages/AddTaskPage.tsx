import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AddTaskPage: React.FC = () => {
   const [newTask, setNewTask] = useState("");
   const [priority, setPriority] = useState(1);
   const [message, setMessage] = useState("");

   const addTask = async () => {
      if (!newTask.trim()) return;
      try {
         await axios.post(`${API_BASE_URL}/tasks`, {
            title: newTask,
            priority,
         });
         setNewTask("");
         setPriority(1);
         setMessage("Task added successfully!");
         setTimeout(() => setMessage(""), 3000);
      } catch (error) {
         console.error("Error adding task:", error);
         setMessage("Error adding task. Please try again.");
      }
   };

   return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-16">
         <h1 className="text-3xl font-bold mb-4">Add New Task</h1>
         <div className="mb-4">
            <input
               type="text"
               value={newTask}
               onChange={(e) => setNewTask(e.target.value)}
               placeholder="Enter task title"
               className="w-full p-2 border rounded"
            />
         </div>
         <div className="mb-4">
            <label className="block mb-2">Priority:</label>
            <select
               value={priority}
               onChange={(e) => setPriority(parseInt(e.target.value))}
               className="w-full p-2 border rounded"
            >
               <option value={1}>Low</option>
               <option value={2}>Medium</option>
               <option value={3}>High</option>
            </select>
         </div>
         <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
         >
            Add Task
         </button>
         {message && (
            <p
               className={`mt-4 ${
                  message.includes("Error") ? "text-red-500" : "text-green-500"
               }`}
            >
               {message}
            </p>
         )}
      </div>
   );
};

export default AddTaskPage;
