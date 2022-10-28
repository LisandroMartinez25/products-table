import React from 'react'

export const Search = ({ value, setValue, action }) => {
  return (
    <div>
      <input type='text' placeholder="Search..." value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  )
}
