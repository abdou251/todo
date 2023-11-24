/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import ThemeContext from './ThemeContext'

const Items = (props) => {
  const { theme, dark, light } = useContext(ThemeContext)

  const [isChecked, setIsChecked] = React.useState(false)

  const checkStyle = {
    textDecorationLine: 'line-through',
  }
  const unCheckStyle = {
    textDecorationLine: 'none',
  }
  const { id, task, remove, isEdit, edit, newTask, setIsEdit, setNewTask } =
    props

  return (
    <div key={id} className='max-w-md mx-auto flex justify-between my-4 '>
      <div className='flex justify-between items-center gap-2'>
        {isEdit.state === true && isEdit.id === id ? (
          <input
            type='text'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className='w-auto h-auto p-2 rounded-lg text-black'
          ></input>
        ) : (
          <>
            {' '}
            <input
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className='h-4 w-4'
              type='checkBox'
            />
            <h2
              style={isChecked ? checkStyle : unCheckStyle}
              className={`${
                theme === dark ? 'text-white' : 'text-black'
              } font-medium`}
            >
              {task}
            </h2>
          </>
        )}
      </div>
      <div className='flex gap-1'>
        {isEdit.state === true && isEdit.id === id ? (
          <>
            {' '}
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => edit(id)}
            >
              save
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => setIsEdit({ id: id, state: false })}
            >
              cancel
            </button>
          </>
        ) : (
          <>
            {' '}
            <button
              className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => setIsEdit({ id: id, state: true })}
            >
              edit
            </button>
            <button
              className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md'
              onClick={() => remove(id)}
            >
              remove
            </button>
          </>
        )}
      </div>
    </div>
  )
}
export default Items
