import React, { useState, useEffect } from 'react'
import List from './Lists/List'
import Alert from './Alert'
import ShowHistory from './Lists/ShowHistory'

import {
  plusFontSize,
  normalFontSize,
  getNotes,
  getDeletedNotes,
} from './functions'

import { BsSun, BsMoon } from 'react-icons/bs'
import { SiGooglefonts } from 'react-icons/si'
import { BiFont, BiPlus } from 'react-icons/bi'
import { GiBackwardTime } from 'react-icons/gi'

function App() {
  const [list, setList] = useState(getNotes())
  const [deletedNotes, setDeletedNotes] = useState(getDeletedNotes())
  const [darkMode, setDarkMode] = useState(true)
  const [fontMode, setFontMode] = useState(true)
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [deletable, setDeletable] = useState(true)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const [showWhat, setShowWhat] = useState('notes')

  const submitWithEnter = (e) => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        submitHandler()
      }
    })
  }
  const submitHandler = () => {
    if (!name || name === ' ') {
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
      showAlert(true, 'success', 'Item Added To The Notes')
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
    setDeletedNotes([...list, ...deletedNotes])
    setIsEditing(false)
    setDeletable(true)
    setList([])
  }
  const clearDeletedNotes = () => {
    showAlert(true, 'danger', 'History Cleared !')
    setDeletedNotes([])
  }
  const removeItem = (id) => {
    if (deletable) {
      showAlert(true, 'danger', 'Item Removed From notes')
      setList(list.filter((item) => item.id !== id))
      const deletedItem = list.filter((item) => item.id === id)
      setDeletedNotes([
        { id: deletedItem[0].id, title: deletedItem[0].title },
        ...deletedNotes,
      ])
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
  const fontModeHandler = () => {
    document.querySelector('.font').classList.toggle('selected')
    setFontMode(!fontMode)
    document.documentElement.classList.toggle('font-mode')
  }
  const showTimeFromDone = (id) => {
    const whoSID = deletedNotes.filter((item) => item.id === id)
    return Number(whoSID[0].id)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('deletedNotes', JSON.stringify(deletedNotes))
  }, [list, deletedNotes])

  submitWithEnter()
  return (
    <>
      <section className='section-center '>
        <h2>{darkMode ? '📝' : '📓'} Note app </h2>

        <button type='button' className='btn' onClick={darkModeHandler}>
          {darkMode ? <BsSun /> : <BsMoon className='moon' />}
        </button>
        <button type='button' className='btn font' onClick={fontModeHandler}>
          {fontMode ? <BiFont /> : <SiGooglefonts className='moon' />}
        </button>
        <button type='button' className='btn size-plus' onClick={plusFontSize}>
          <BiPlus />
        </button>
        <button
          type='button'
          className='btn size-minus'
          onClick={normalFontSize}>
          <GiBackwardTime />
        </button>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      </section>

      <section className='section-center router'>
        <button
          className={`clear-btn ${showWhat === 'history' ? 'selected' : ''}`}
          onClick={() => {
            setShowWhat('history')
          }}>
          history
        </button>
        <button
          className={`clear-btn ${showWhat === 'notes' ? 'selected' : ''}`}
          onClick={() => {
            setShowWhat('notes')
          }}>
          notes
        </button>
      </section>

      {showWhat === 'notes' && (
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
      )}
      {showWhat === 'notes' && list.length > 0 && (
        <section className='section-center'>
          <h2>notes</h2>
          <div className='grocery-container'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>
              Clear All Notes
            </button>
          </div>
        </section>
      )}
      {showWhat === 'history' && deletedNotes.length === 0 && (
        <section className='section-center'>
          <h2>nothing is here...</h2>
        </section>
      )}
      {showWhat === 'history' && deletedNotes.length > 0 && (
        <section className='section-center'>
          <h2>history</h2>
          <div className='grocery-container'>
            <ShowHistory
              items={deletedNotes}
              showTimeFromDone={showTimeFromDone}
              showAlert={showAlert}
            />
            <button className='clear-btn' onClick={clearDeletedNotes}>
              Clear History
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default App
