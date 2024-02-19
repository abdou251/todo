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

function App() {
  const light = 'bg-slate-100 text-gray-700 '
  const dark = 'bg-gray-700 text-white'
  const [theme, setTheme] = useState(light)
  const contexValue = { light, theme, dark }
  const id = uniqid()
  const [isEdit, setIsEdit] = useState({ id: id, state: false })
  const [task, setTask] = useState('')
  const [newTask, setNewTask] = useState('')

  const [list, setList] = useState(() => {
    try {
      const storedList = JSON.parse(localStorage.getItem('tasks'))
      return storedList || []
    } catch (error) {
      console.error('Error retrieving tasks from local storage:', error)
      return []
    }
  })
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(list))
  }, [list])
  const hundleTheme = (e) => {
    e.preventDefault()
    theme === light ? setTheme(dark) : setTheme(light)
  }
  const handleClick = (e) => {
    e.preventDefault()
    if (task) {
      setList([...list, { id, task }])
      setTask('')
    }
  }
  const edit = (id) => {
    // Create a new array with the updated item
    const updatedList = list.map((item) =>
      item.id === id && newTask ? { ...item, task: newTask } : item
    )

    // Update the state with the new array
    setList(updatedList)
    setIsEdit({ id: id, state: false })
    setNewTask('')
  }

  const remove = (id) => {
    setList((list) => list.filter((item) => item.id !== id))
    console.log(list)
  }

  return (
    <ThemeContext.Provider value={contexValue}>
      <section
        className={`${
          theme === light ? 'bg-slate-200' : 'bg-slate-900'
        } w-full h-screen text-center p-8`}
      >
        <button className='h-8 w-4 bg ' onClick={hundleTheme}>
          {theme === dark ? (
            <IconContext.Provider value={{ color: 'white' }}>
              <IoIosSunny className='h-8 w-8 ' />
            </IconContext.Provider>
          ) : (
            <MdDarkMode className='h-8 w-8 ' />
          )}
        </button>
        <div className='max-w-md mx-auto text-center  '>
          <form
            className={`${theme} flex flex-col justify-center items-center p-6 rounded-lg shadow-md`}
            onSubmit={handleClick}
          >
            <label htmlFor='task' className={`${theme}block  font-medium mb-2`}>
              Add a task
            </label>
            <input
              className={`${
                theme === light ? 'shadow-gray' : 'shadow-gray'
              }w-10/12 text-black border-gray-400 p-2 -full rounded-md px-8 mb-6 shadow-xl`}
              type='text'
              value={task}
              name='task'
              onChange={(e) => setTask(e.target.value)}
            />
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
              type='submit'
            >
              Submit
            </button>
          </form>

          {list.map((item) => {
            return (
              <Items
                key={item.id}
                {...item}
                remove={remove}
                setTask={setTask}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                edit={edit}
                newTask={newTask}
                setNewTask={setNewTask}
              />
            )
          })}
        </div>
      </section>
    </ThemeContext.Provider>
  )
}

export default App
