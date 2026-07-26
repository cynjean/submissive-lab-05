import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage.jsx'
import { useProducts } from '../context/ProductContext.jsx'

export default function Dashboard() {
  const { error, products, status, storeInfo } = useProducts()
  const inventoryValue = products.reduce((total, product) => total + Number(product.price) * Number(product.stock), 0)
  const lowStockCount = products.filter((product) => product.stock <= 10).length
  const featuredCount = products.filter((product) => product.featured).length

  return (
    <section className="page-grid">
      <div className="hero-panel">
        <p className="eyebrow">Administrator portal</p>
        <h1>{storeInfo?.name || 'Circuit Shelf'}</h1>
        <p>{storeInfo?.description || 'Manage products, inventory, and pricing from one responsive dashboard.'}</p>
        <div className="hero-actions">
          <Link className="button" to="/products">
            View Products
          </Link>
          <Link className="button secondary" to="/new">
            Add Product
          </Link>
        </div>
      </div>

      <StatusMessage error={error} status={status} />

      <section className="stats-grid" aria-label="Store summary">
        <article>
          <span>{products.length}</span>
          <p>Total products</p>
        </article>
        <article>
          <span>{lowStockCount}</span>
          <p>Low stock items</p>
        </article>
        <article>
          <span>{featuredCount}</span>
          <p>Featured products</p>
        </article>
        <article>
          <span>${inventoryValue.toFixed(0)}</span>
          <p>Inventory value</p>
        </article>
      </section>
    </section>
  )
}
