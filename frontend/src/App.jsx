import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const API_URL = "http://localhost:3000/tasks";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", priority: "Medium" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filter, search]);

  const fetchTasks = async () => {
    const response = await axios.get(API_URL, { params: { search, completed: filter !== "all" ? filter === "completed" : undefined } });
    setTasks(response.data);
  };

  const createTask = async () => {
    await axios.post(API_URL, newTask);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Medium" });
    fetchTasks();
  };

  const updateTask = async (id, updates) => {
    await axios.put(`${API_URL}/${id}`, updates);
    fetchTasks();
    setSelectedTask(null)
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
    setSelectedTask(null)
  };

  const completeTask = async (id) => {
    await axios.patch(`${API_URL}/${id}/complete`);
    fetchTasks();
  };

  const taskDistributionData = {
    labels: ["High", "Medium", "Low"],
    datasets: [{
      label: "Task Priority Distribution",
      data: [tasks.filter(t => t.priority === "High").length, tasks.filter(t => t.priority === "Medium").length, tasks.filter(t => t.priority === "Low").length],
      backgroundColor: ["#FF5733", "#FFBD33", "#33A1FF"],
    }],
  };

  const completionRateData = {
    labels: ["Completed", "Pending"],
    datasets: [{
      label: "Task Completion Rate",
      data: [tasks.filter(t => t.completed).length, tasks.filter(t => !t.completed).length],
      backgroundColor: ["#5A9E4D", "#F16D60"],
    }],
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen font-poppins">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Task Manager</h1>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <input type="text" placeholder="Search tasks..." className="border p-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="border p-3 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map(task => (
          <div key={task._id} className="border p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer bg-white hover:bg-indigo-50" onClick={() => setSelectedTask(task)}>
            <h2 className="text-xl font-semibold text-indigo-600">{task.title}</h2>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Priority: <span className={`text-${task.priority.toLowerCase()}-600 font-semibold`}>{task.priority}</span></p>
            <p className={`text-sm font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>{task.completed ? "Completed" : "Pending"}</p>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-indigo-600">{selectedTask.title}</h2>
            <p className="text-gray-700">{selectedTask.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Priority: {selectedTask.priority}</p>
            <p className={`text-sm font-semibold ${selectedTask.completed ? 'text-green-500' : 'text-red-500'}`}>{selectedTask.completed ? "Completed" : "Pending"}</p>
            <div className="mt-4 flex gap-3 justify-center">
              <button className="bg-green-500 flex justify-center items-center gap-2 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-all" onClick={() => completeTask(selectedTask._id)}><FiCheckCircle size={20} /> Complete</button>
              <button className="bg-red-500 flex justify-center items-center gap-2 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all" onClick={() => deleteTask(selectedTask._id)}><FiXCircle size={20} /> Delete</button>
              <button className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-all" onClick={() => setSelectedTask(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="flex justify-center">
            <Pie className="max-w-full w-[90%]" data={taskDistributionData} />
          </div>
          <div className="flex justify-center">
            <Pie className="max-w-full w-[90%]" data={completionRateData} />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Create Task</h2>
        <input type="text" placeholder="Title" className="border p-4 w-full rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        <textarea placeholder="Description" className="border p-4 w-full rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}></textarea>
        <input type="date" className="border p-4 w-full rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />
        <select className="border p-4 w-full rounded-lg mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full w-full hover:bg-indigo-700 transition-all" onClick={createTask}>Add Task</button>
      </div>
    </div>
  );
}
