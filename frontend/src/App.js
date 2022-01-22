import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from 'react'
import AddTask from "./components/AddTask";

const App = () => {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //FetchData
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/api/allNotesForCourses')
    const data = await res.json()

    console.log(data)
    return data
  }

  //AddTask

  const addTask = async (task) => {
    console.log(task)
    const res = await fetch('http://localhost:8000/api/createNotesWithCourses', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks([...tasks, data])

    // const addTask = (task) => {
    //   const id = tasks.length + 1
    //   console.log(id)
    //   const newTask = { id, ...task }
    //   setTasks([...tasks, newTask])

  }

  //DeleteTask
  const deleteTask = async (id) => {
    console.log('delete', id)

    await fetch(`http://localhost:8000/api/allNotesForCourses/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.noteId !== id))
  }

  //Reminder
  const toggleReminder = (id) => {
    console.log(id)
    setTasks(tasks.map((task) => task.noteId === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        propShowAdd={showAddTask} />
      {showAddTask &&
        <AddTask
          onAdd={addTask} />}
      {tasks.length > 0 ?
        (<Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder} />) :
        ('Nu exista notite')}
    </div>
  );
}

export default App;
