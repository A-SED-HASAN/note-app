import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className='single-note'>
            <p className='title'>{title}</p>
            <div
              className='btn-container'
              style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}>
                <AiOutlineEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}>
                <FiTrash2 />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
