/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import uniqid from 'uniqid'
import Items from './Items'
import ThemeContext from './ThemeContext'
import { IoIosSunny } from 'react-icons/io'
import { MdDarkMode } from 'react-icons/md'
import { IconContext } from 'react-icons'

// Constants for better maintainability
const THEME_CLASSES = {
  LIGHT: 'bg-slate-100 text-gray-700',
  DARK: 'bg-gray-700 text-white',
}

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || THEME_CLASSES.LIGHT
  )
  const [editingId, setEditingId] = useState(null)
  const [task, setTask] = useState('')
  const [newTask, setNewTask] = useState('')

  const [list, setList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) || []
    } catch (error) {
      console.error('Error loading tasks:', error)
      return []
    }
  })

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(list))
    localStorage.setItem('theme', theme)
  }, [list, theme])

  const toggleTheme = (e) => {
    e.preventDefault()
    setTheme(
      theme === THEME_CLASSES.LIGHT ? THEME_CLASSES.DARK : THEME_CLASSES.LIGHT
    )
  }

  const addTask = (e) => {
    e.preventDefault()
    if (task.trim()) {
      const newId = uniqid()
      setList([...list, { id: newId, task: task.trim() }])
      setTask('')
    }
  }

  const editTask = (id) => {
    if (newTask.trim()) {
      setList(
        list.map((item) =>
          item.id === id ? { ...item, task: newTask.trim() } : item
        )
      )
    }
    setEditingId(null)
    setNewTask('')
  }

  const removeTask = (id) => {
    setList(list.filter((item) => item.id !== id))
  }

  const contextValue = {
    theme,
    themeClasses: THEME_CLASSES,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <section
        className={`${
          theme === THEME_CLASSES.LIGHT ? 'bg-slate-200' : 'bg-slate-900'
        } w-full h-screen text-center p-8`}
      >
        <button onClick={toggleTheme} className='h-8 w-8 mb-4'>
          {theme === THEME_CLASSES.DARK ? (
            <IconContext.Provider value={{ color: 'white' }}>
              <IoIosSunny className='h-8 w-8' />
            </IconContext.Provider>
          ) : (
            <MdDarkMode className='h-8 w-8' />
          )}
        </button>

        <div className='max-w-md mx-auto text-center'>
          <form
            onSubmit={addTask}
            className={`${theme} flex flex-col justify-center items-center p-6 rounded-lg shadow-md`}
          >
            <label htmlFor='task' className='block font-medium mb-2'>
              Add a task
            </label>
            <input
              className='w-10/12 text-black border-gray-400 p-2 rounded-md px-4 mb-6 shadow-xl'
              type='text'
              value={task}
              name='task'
              onChange={(e) => setTask(e.target.value)}
              placeholder='Enter a task...'
            />
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
              type='submit'
            >
              Add Task
            </button>
          </form>

          {list.map((item) => (
            <Items
              key={item.id}
              item={item}
              remove={removeTask}
              editingId={editingId}
              setEditingId={setEditingId}
              edit={editTask}
              newTask={newTask}
              setNewTask={setNewTask}
            />
          ))}
        </div>
      </section>
    </ThemeContext.Provider>
  )
}

export default App
