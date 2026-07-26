import { useMemo, useState } from 'react'

export default function useProductSearch(products) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) => {
      return [product.name, product.category, product.sku, product.description]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [products, searchTerm])

  return {
    searchTerm,
    setSearchTerm,
    filteredProducts
  }
}
