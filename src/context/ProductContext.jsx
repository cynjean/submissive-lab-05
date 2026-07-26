import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const API_URL = 'http://localhost:3001'
const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [storeInfo, setStoreInfo] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  const loadStore = useCallback(async () => {
    setStatus('loading')
    setError('')

    try {
      const [productsResponse, storeResponse] = await Promise.all([
        fetch(`${API_URL}/products`),
        fetch(`${API_URL}/store_info/1`)
      ])

      if (!productsResponse.ok || !storeResponse.ok) {
        throw new Error('The store data could not be loaded.')
      }

      const productsData = await productsResponse.json()
      const storeData = await storeResponse.json()

      setProducts(productsData)
      setStoreInfo(storeData)
      setStatus('ready')
    } catch (requestError) {
      setError(requestError.message)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadStore()
  }, [loadStore])

  async function addProduct(product) {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })

    if (!response.ok) {
      throw new Error('The product could not be added.')
    }

    const createdProduct = await response.json()
    setProducts((currentProducts) => [...currentProducts, createdProduct])
    return createdProduct
  }

  async function updateProduct(productId, updates) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new Error('The product could not be updated.')
    }

    const updatedProduct = await response.json()
    setProducts((currentProducts) =>
      currentProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    )
    return updatedProduct
  }

  async function deleteProduct(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('The product could not be deleted.')
    }

    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId))
  }

  const value = useMemo(
    () => ({
      addProduct,
      deleteProduct,
      error,
      loadStore,
      products,
      status,
      storeInfo,
      updateProduct
    }),
    [error, loadStore, products, status, storeInfo]
  )

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error('useProducts must be used inside a ProductProvider.')
  }

  return context
}
