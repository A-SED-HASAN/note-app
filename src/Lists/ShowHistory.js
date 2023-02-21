import React from 'react'
import { msToTime } from '../functions'
const ShowHistory = ({ items, showTimeFromDone, showAlert }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className='single-note'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => {
                  const now = new Date().getTime()
                  const getDifferent = -(showTimeFromDone(id) - now)
                  showAlert(true, 'info', `${msToTime(getDifferent)}  ago !`)
                }}>
                ⏱️
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default ShowHistory
