/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import ThemeContext from './ThemeContext'

const Items = ({
  item,
  remove,
  editingId,
  setEditingId,
  edit,
  newTask,
  setNewTask,
}) => {
  const { theme, themeClasses } = useContext(ThemeContext)
  const [isChecked, setIsChecked] = React.useState(false)

  const { id, task } = item

  // Style for checked/unchecked tasks
  const textStyle = {
    textDecoration: isChecked ? 'line-through' : 'none',
    opacity: isChecked ? 0.7 : 1,
  }

  const isEditing = editingId === id

  const handleSave = () => {
    if (newTask.trim()) {
      edit(id)
    } else {
      setEditingId(null) // Cancel if empty
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setNewTask('')
  }

  const handleEditStart = () => {
    setEditingId(id)
    setNewTask(task) // Pre-populate with current task
  }

  return (
    <div
      className={`max-w-md mx-auto flex justify-between items-center my-4 p-4 rounded-lg ${
        theme === themeClasses.DARK ? 'bg-gray-600' : 'bg-white'
      } shadow-md`}
    >
      {/* Left Side - Checkbox and Task Content */}
      <div className='flex items-center gap-3 flex-1'>
        {isEditing ? (
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className='w-full p-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-blue-500'
            autoFocus
            placeholder='Edit task...'
          />
        ) : (
          <>
            <input
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className='h-5 w-5 cursor-pointer'
              type='checkbox'
              id={`task-${id}`}
            />
            <label
              htmlFor={`task-${id}`}
              style={textStyle}
              className={`${
                theme === themeClasses.DARK ? 'text-white' : 'text-gray-800'
              } font-medium cursor-pointer select-none flex-1 text-left`}
            >
              {task}
            </label>
          </>
        )}
      </div>

      {/* Right Side - Action Buttons */}
      <div className='flex gap-2 ml-4'>
        {isEditing ? (
          <>
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200'
              onClick={handleSave}
              disabled={!newTask.trim()}
            >
              Save
            </button>
            <button
              className='bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200'
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200'
              onClick={handleEditStart}
              disabled={isChecked}
            >
              Edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-md transition-colors duration-200'
              onClick={() => remove(id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Items
