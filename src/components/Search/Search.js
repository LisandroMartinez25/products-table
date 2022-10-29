import React from 'react'
import './Search.css'

export const Search = ({ value = '', setValue }) => {
  return (
    <div className='searchContent'>
      <input type='text' className='txt' placeholder="Search..." value={value} onChange={(event) => setValue(event.target.value)} />
      <img src='/assets/search.png' className='imgSearch'/>
    </div>
  )
}
