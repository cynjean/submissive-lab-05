import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import { useProducts } from '../context/ProductContext.jsx'

export default function ProductDetails() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { deleteProduct, error, products, status, updateProduct } = useProducts()
  const [message, setMessage] = useState('')

  const product = useMemo(
    () => products.find((currentProduct) => String(currentProduct.id) === productId),
    [productId, products]
  )

  async function handleUpdate(updates) {
    await updateProduct(product.id, updates)
    setMessage('Product details updated.')
  }

  async function handleQuickUpdate(field, value) {
    await updateProduct(product.id, { [field]: Number(value) })
    setMessage(`${field === 'price' ? 'Price' : 'Stock'} updated.`)
  }

  async function handleDelete() {
    await deleteProduct(product.id)
    navigate('/products')
  }

  if (status !== 'ready') {
    return <StatusMessage error={error} status={status} />
  }

  if (!product) {
    return (
      <section className="page-stack">
        <p className="status-message">Product not found.</p>
        <Link className="button secondary" to="/products">
          Back to products
        </Link>
      </section>
    )
  }

  return (
    <section className="details-layout">
      <article className="detail-preview">
        <img src={product.image} alt="" />
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <dl className="detail-list">
          <div>
            <dt>SKU</dt>
            <dd>{product.sku}</dd>
          </div>
          <div>
            <dt>Price</dt>
            <dd>${Number(product.price).toFixed(2)}</dd>
          </div>
          <div>
            <dt>Stock</dt>
            <dd>{product.stock}</dd>
          </div>
        </dl>
      </article>

      <div className="edit-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Manage</p>
            <h2>Edit product</h2>
          </div>
          <button className="button danger-button" onClick={handleDelete} type="button">
            Delete
          </button>
        </div>

        <div className="quick-edit" aria-label="Quick product updates">
          <label>
            Quick price
            <input
              min="0"
              onBlur={(event) => handleQuickUpdate('price', event.target.value)}
              step="0.01"
              type="number"
              defaultValue={product.price}
            />
          </label>
          <label>
            Quick stock
            <input
              min="0"
              onBlur={(event) => handleQuickUpdate('stock', event.target.value)}
              type="number"
              defaultValue={product.stock}
            />
          </label>
        </div>

        {message ? <p className="success-message">{message}</p> : null}
        <ProductForm buttonLabel="Update Product" initialProduct={product} onSubmit={handleUpdate} />
      </div>
    </section>
  )
}
