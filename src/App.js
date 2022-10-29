import { useEffect, useState } from 'react';
import './App.css';
import { Image } from './components/Image/Image';
import { Search } from './components/Search/Search';
import { Sort } from './components/Sort/Sort';
import productsJSON from './products.json'

const App = () => {
  const [products, setProducts] = useState([])
  const [sortSelected, setSortSelected] = useState('')
  const heads = ['code', 'position', 'quantity', 'image', 'price', 'description']
  const [sortInitial, setSortInitial] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    if (search.length >= 1) {
      filerProducts()
    } else {
      getProducts()
    }
  }, [search])

  const filerProducts = () => {
    const filtered = products.filter(product => Object.values(product)
      .some(individualValue => `${individualValue}`.toLowerCase()
      .includes(search.toLowerCase())))

    setProducts(filtered)
  }
  
  const getProducts = () => {
    setProducts(productsJSON.products)
    setSortInitial(productsJSON.products)
  }

  const currency = (value) => {
    return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` 
  }

  const sort = (direction, sortKey) => {
    if (direction === 'default') {
      setProducts(sortInitial)
    } else {
      const sorted = [...products]

      sorted.sort((a,b) => {
        if (typeof a[sortKey] === 'string') {
          return direction === 'asc' ? (a[sortKey].localeCompare(b[sortKey])) : (b[sortKey].localeCompare(a[sortKey]))
        } else {
          return direction === 'asc' ? (a[sortKey] - b[sortKey]) : (b[sortKey] - a[sortKey])
        }
      })

      setProducts(sorted)
    }
  }

  return (
    <div className="App">
      <div className="search" >
        <Search value={search} setValue={setSearch} />
      </div>
      {
        products.length ? (
          <table className='customTable' cellSpacing='0' cellPadding='0'>
            <thead className='head'>
              <tr>
                { heads.map(field => <th key={field}>
                  <div className='headField'>{field.toUpperCase()}<Sort sortKey={field} sortSelected={sortSelected} setSortSelected={setSortSelected} sort={sort} /></div>
                </th>) }
              </tr>
            </thead>

            <tbody>
              {
                products.map((product, index) => (
                  <tr className='row' key={index}>
                    { 
                      heads.map((field, index) => {
                        const value = product[field]
                        return (
                          <td className='field' key={field+index}>
                            {
                              field === 'price' ? currency(value)
                                : field === 'image' ? <Image path={value}/>
                                  : value
                            }
                          </td>
                        )
                      }) 
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : null
      }
    </div>
  );
}

export default App;
