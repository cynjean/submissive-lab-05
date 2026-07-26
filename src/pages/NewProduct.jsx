import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm.jsx'
import { useProducts } from '../context/ProductContext.jsx'

const fallbackImage =
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'

export default function NewProduct() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  async function handleAddProduct(product) {
    const createdProduct = await addProduct({
      ...product,
      image: product.image || fallbackImage
    })
    navigate(`/products/${createdProduct.id}`)
  }

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Create</p>
          <h1>Add a product</h1>
        </div>
      </div>

      <ProductForm buttonLabel="Add Product" onSubmit={handleAddProduct} />
    </section>
  )
}
