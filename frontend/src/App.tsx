import React from "react";
import {
   BrowserRouter as Router,
   Route,
   Routes,
} from "react-router-dom";
import AddTaskPage from "./pages/AddTaskPage";
import TaskListPage from "./pages/TaskListPage";
import NavigationButton from "./components/NavigationButton";
import "./index.css";


const App: React.FC = () => {
   return (
      <Router>
         <div className="container mx-auto p-4 max-w-4xl">
            <NavigationButton />
            <Routes>
               <Route path="/" element={<AddTaskPage />} />
               <Route path="/tasks" element={<TaskListPage />} />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
