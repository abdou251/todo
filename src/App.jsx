/* eslint-disable react/prop-types */
import { useState } from 'react'
import './App.css'
import uniqid from 'uniqid'

function App() {
  const id = uniqid()
  const [edit, setEdit] = useState(false)
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const handleClick = (e) => {
    e.preventDefault()
    if (task) {
      setList([...list, { id, task }])
      setTask('')
    }
  }
  const remove = (id) => {
    setList((list) => list.filter((item) => item.id !== id))
    console.log(list)
  }

  return (
    <>
      <div className='max-w-md mx-auto'>
        <form
          className='bg-white p-6 rounded-lg shadow-md'
          onSubmit={handleClick}
        >
          <label
            htmlFor='task'
            className='block text-gray-700 font-medium mb-2'
          >
            Add a task
          </label>
          <input
            className='border border-gray-400 p-2 w-full rounded-md px-4 mb-6'
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
            <Items key={item.id} {...item} remove={remove} setTask={setTask} />
          )
        })}
      </div>
    </>
  )
}

const Items = (props) => {
  const [isChecked, setIsChecked] = useState(false)
  const checkStyle = {
    textDecorationLine: 'line-through',
  }
  const unCheckStyle = {
    textDecorationLine: 'none',
  }
  const { id, task, remove } = props

  return (
    <div key={id} className='max-w-md mx-auto flex justify-between my-4 '>
      <div className='flex justify-between items-center gap-2'>
        {' '}
        <input
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className='h-4 w-4'
          type='checkBox'
        />
        <h2
          style={isChecked ? checkStyle : unCheckStyle}
          className='font-medium'
        >
          {task}
        </h2>
      </div>
      <div className='flex gap-1'>
        <button
          className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
          onClick={() => remove(id)}
        >
          edit
        </button>
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
          onClick={() => remove(id)}
        >
          remove
        </button>
      </div>
    </div>
  )
}

export default App
