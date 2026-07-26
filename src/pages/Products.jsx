import ProductCard from '../components/ProductCard.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useProducts } from '../context/ProductContext.jsx'
import useProductSearch from '../hooks/useProductSearch.js'

export default function Products() {
  const { error, products, status } = useProducts()
  const { filteredProducts, searchTerm, setSearchTerm } = useProductSearch(products)

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inventory</p>
          <h1>Products</h1>
        </div>

        <label className="search-box" htmlFor="product-search">
          <span>Search products</span>
          <input
            id="product-search"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Try keyboard, audio, or SKU"
            type="search"
            value={searchTerm}
          />
        </label>
      </div>

      <StatusMessage error={error} status={status} />

      {status === 'ready' ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}

      {status === 'ready' && filteredProducts.length === 0 ? (
        <p className="status-message">No products match your search.</p>
      ) : null}
    </section>
  )
}
