import React from 'react'
import './Image.css'

export const Image = ({ path }) => {
  return (
    <img className='image' src={`/images/${path}`} />
  )
}
