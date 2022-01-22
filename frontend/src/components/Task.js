import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => onToggle(task.noteId)}>
      <h3>
        {task.title}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.noteId)} />
      </h3>
      <h3>
        Course:
        {task.Courses[0].name}
      </h3>
      <h3>
        -
        {task.body}
      </h3>
    </div>
  )
}

export default Task
