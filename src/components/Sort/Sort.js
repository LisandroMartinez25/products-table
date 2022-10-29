import React, { useEffect, useState } from 'react'
import './Sort.css'

export const Sort = ({ sortKey, sortSelected, setSortSelected, sort }) => {
  const [order, setOrder] = useState('both')

  const changeOrder = () => {
    setSortSelected(sortKey)

    switch (order) {
      case 'both':
        setOrder('arrowTop')
        sort('asc', sortKey)
        break
      case 'arrowTop':
        setOrder('arrowDown')
        sort('desc', sortKey)
        break
      case 'arrowDown':
        setOrder('both')
        sort('default', sortKey)
        break
      default:
        setOrder('both')
        sort('default', sortKey)
        break
    }
  }

  useEffect(() => {
    if (sortSelected !== sortKey) setOrder('both')
  }, [sortSelected])
  

  return (
    <button className='sort' onClick={() => changeOrder()} >
      {
        order === 'both'
          ? (
            <div className='union'>
              <img src='/assets/arrow.png'/> <img src='/assets/arrow.png' className='down'/>
            </div>
          ) : <img src='/assets/arrow.png' className={order == 'arrowDown' ? 'down' : ''} /> 
      }
    </button>
  )
}
