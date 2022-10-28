import { useEffect, useState } from 'react';
import './App.css';
import { Image } from './components/Image/Image';
import { Search } from './components/Search/Search';
import productsJSON from './products.json'

const App = () => {
  const [products, setProducts] = useState([])
  const heads = ['code', 'position', 'quantity', 'image', 'price', 'description']

  useEffect(() => {
    (async () => await getProducts())()
  }, [])
  
  const getProducts = async () => {
    setProducts(productsJSON.products)
  }

  const currency = (value) => {
    return `$ ${Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` 
  }

  console.log(productsJSON.products);
  return (
    <div className="App">
      <div className="search" >
        <Search />
      </div>
      {
        products.length ? (
          <table className='customTable' cellspacing="0" cellpadding="0">
            <thead className='head'>
              <tr>
                { heads.map(field => <th className='headField'>{field.toUpperCase()}</th>) }
              </tr>
            </thead>

            <tbody>
              {
                products.map(product => (
                  <tr className='row'>
                    { 
                      heads.map(field => {
                        const value = product[field]
                        return (
                          <td className='field'>
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
