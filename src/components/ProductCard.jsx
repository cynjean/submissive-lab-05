import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const stockLevel = product.stock <= 10 ? 'Low stock' : 'In stock'

  return (
    <article className="product-card">
      <img src={product.image} alt="" />
      <div className="product-card-body">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>

        <div className="product-card-footer">
          <span className="price">${Number(product.price).toFixed(2)}</span>
          <span className={product.stock <= 10 ? 'pill danger' : 'pill'}>{stockLevel}</span>
        </div>

        <Link className="button ghost" to={`/products/${product.id}`}>
          Manage
        </Link>
      </div>
    </article>
  )
}
