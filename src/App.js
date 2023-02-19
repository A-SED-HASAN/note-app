import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { BsSun, BsMoon } from 'react-icons/bs'
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [deletable, setDeletable] = useState(true)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const submitWithEnter = (e) => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        submitHandler()
      }
    })
  }
  const submitHandler = () => {
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setDeletable(true)
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value changed')
    } else {
      showAlert(true, 'success', 'item Added to the list')
      const newItem = {
        id: new Date().getTime().toString(),
        title: name.trim(),
      }
      setList([newItem, ...list])
      setName('')
    }
  }
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, msg, type })
  }
  const clearList = () => {
    showAlert(true, 'danger', 'All Notes Cleared !')
    setName('')
    setList([])
    setIsEditing(false)
  }
  const removeItem = (id) => {
    if (deletable) {
      showAlert(true, 'danger', 'Item Removed From Todo')
      setList(list.filter((item) => item.id !== id))
    } else {
      showAlert(true, 'danger', 'you want delete it or edit it?')
    }
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setDeletable(false)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  const darkModeHandler = () => {
    document.querySelector('.btn').classList.toggle('selected')
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark-mode')
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  submitWithEnter()
  return (
    <>
      <section className='section-center '>
        <h2>{darkMode ? '📝' : '📓'} Note app </h2>

        <button type='button' className='btn' onClick={darkModeHandler}>
          {darkMode ? <BsSun /> : <BsMoon className='moon' />}
        </button>

        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      </section>
      <section className='section-center'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submitHandler()
          }}
          className='grocery-form'>
          <div className='form-control'>
            <textarea
              placeholder='your note here ... 
* you can add with ctrl + enter *'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='note-input'></textarea>
            <button type='submit' className='submit-btn'>
              {isEditing ? 'edit' : 'Add'}
            </button>
          </div>
        </form>
      </section>

      {list.length > 0 && (
        <section className='section-center'>
          <div className='grocery-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>
              Clear All Notes
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default App
