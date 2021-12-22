import "./index.css";
import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Tasks from "./component/Tasks";
import AddTask from "./component/AddTask";
import { useState , useContext ,createContext,useEffect} from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import About from "./component/About";
//import { object } from "prop-types";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const useTaskContext = createContext();
 
  useEffect(() => {
    const getTasks =async() => {
      const taskFromServer =await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])

  
  const UserPage = () => {
      const context=useContext(useTaskContext)
      return {context}
  }
 
  //fetch task
  const fetchTasks = async() => {
    const res=await fetch('http://localhost:5000/tasks')
    const data=await res.json()
    return data;
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };
  <useTaskContext.Provider value={tasks}>
      <UserPage/>
  </useTaskContext.Provider>
  return (
    
    <div className="container">
      
      <Router>  
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>
        <Route path='/' element={
          <>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Task To Show"
      )}
      </>
        }
        />
      <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
      </Router>
    </div>
    
  );
};
export default App;
