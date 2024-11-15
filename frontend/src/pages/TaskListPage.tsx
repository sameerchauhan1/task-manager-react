import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = "http://localhost:5000/api";

interface Task {
   id: number;
   title: string;
   completed: boolean;
   priority: number;
}

const TaskListPage: React.FC = () => {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [searchQuery, setSearchQuery] = useState("");
   const [sortCriteria, setSortCriteria] = useState<keyof Task>("id");

   useEffect(() => {
      fetchTasks();
   }, []);

   const fetchTasks = async () => {
      try {
         const response = await axios.get(`${API_BASE_URL}/tasks`);
         setTasks(response.data);
      } catch (error) {
         console.error("Error fetching tasks:", error);
      }
   };

   const deleteTask = async (id: number) => {
      try {
         await axios.delete(`${API_BASE_URL}/tasks/${id}`);
         setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
         console.error("Error deleting task:", error);
      }
   };

   const toggleComplete = async (task: Task) => {
      try {
         const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
            ...task,
            completed: !task.completed,
         });
         setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
      } catch (error) {
         console.error("Error updating task:", error);
      }
   };

   const updatePriority = async (task: Task, priority: number) => {
      try {
         const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, {
            ...task,
            priority,
         });
         setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
      } catch (error) {
         console.error("Error updating task priority:", error);
      }
   };

   const searchTasks = async () => {
      try {
         const response = await axios.get(
            `${API_BASE_URL}/tasks/search?query=${searchQuery}`
         );
         setTasks(response.data);
      } catch (error) {
         console.error("Error searching tasks:", error);
      }
   };

   const sortedTasks = [...tasks].sort((a, b) => {
      if (a[sortCriteria] < b[sortCriteria]) return -1;
      if (a[sortCriteria] > b[sortCriteria]) return 1;
      return 0;
   });

   return (
      <div className="bg-white p-6 rounded-lg shadow-md mt-16">
         <h1 className="text-3xl font-bold mb-4">Task List</h1>
         <div className="mb-4">
            <input
               type="text"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyPress={(e) => e.key === "Enter" && searchTasks()}
               placeholder="Search tasks"
               className="w-full p-2 border rounded"
            />
            <button
               onClick={searchTasks}
               className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
               Search
            </button>
         </div>
         <div className="mb-4">
            <select
               value={sortCriteria}
               onChange={(e) => setSortCriteria(e.target.value as keyof Task)}
               className="w-full p-2 border rounded"
            >
               <option value="id">Sort by ID</option>
               <option value="title">Sort by Title</option>
               <option value="completed">Sort by Completion</option>
               <option value="priority">Sort by Priority</option>
            </select>
         </div>
         <AnimatePresence>
            {sortedTasks.map((task) => (
               <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 p-4 rounded shadow mb-2 flex items-center"
               >
                  <input
                     type="checkbox"
                     checked={task.completed}
                     onChange={() => toggleComplete(task)}
                     className="mr-2"
                  />
                  <span
                     className={`flex-grow ${
                        task.completed ? "line-through" : ""
                     }`}
                  >
                     {task.title}
                  </span>
                  <select
                     value={task.priority}
                     onChange={(e) =>
                        updatePriority(task, parseInt(e.target.value))
                     }
                     className="mr-2 p-1 border rounded"
                  >
                     <option value={1}>Low</option>
                     <option value={2}>Medium</option>
                     <option value={3}>High</option>
                  </select>
                  <button
                     onClick={() => deleteTask(task.id)}
                     className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                     Delete
                  </button>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>
   );
};

export default TaskListPage;
