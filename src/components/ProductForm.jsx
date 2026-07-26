import { useId, useRef, useState } from 'react'

const blankProduct = {
  category: '',
  description: '',
  featured: false,
  image: '',
  name: '',
  price: '',
  sku: '',
  stock: ''
}

export default function ProductForm({ buttonLabel = 'Save Product', initialProduct = blankProduct, onSubmit }) {
  const formId = useId()
  const firstFieldRef = useRef(null)
  const [formData, setFormData] = useState({
    ...blankProduct,
    ...initialProduct,
    price: initialProduct.price ?? '',
    stock: initialProduct.stock ?? ''
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { checked, name, type, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSaving(true)
    setMessage('')

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    }

    try {
      await onSubmit(productPayload)
      setMessage('Product saved successfully.')
      if (!initialProduct.id) {
        setFormData(blankProduct)
        firstFieldRef.current?.focus()
      }
    } catch (submitError) {
      setMessage(submitError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label htmlFor={`${formId}-name`}>
        Product name
        <input
          id={`${formId}-name`}
          name="name"
          onChange={handleChange}
          ref={firstFieldRef}
          required
          type="text"
          value={formData.name}
        />
      </label>

      <label htmlFor={`${formId}-category`}>
        Category
        <input
          id={`${formId}-category`}
          name="category"
          onChange={handleChange}
          required
          type="text"
          value={formData.category}
        />
      </label>

      <label htmlFor={`${formId}-sku`}>
        SKU
        <input id={`${formId}-sku`} name="sku" onChange={handleChange} required type="text" value={formData.sku} />
      </label>

      <label htmlFor={`${formId}-price`}>
        Price
        <input
          id={`${formId}-price`}
          min="0"
          name="price"
          onChange={handleChange}
          required
          step="0.01"
          type="number"
          value={formData.price}
        />
      </label>

      <label htmlFor={`${formId}-stock`}>
        Stock
        <input
          id={`${formId}-stock`}
          min="0"
          name="stock"
          onChange={handleChange}
          required
          type="number"
          value={formData.stock}
        />
      </label>

      <label htmlFor={`${formId}-image`}>
        Image URL
        <input
          id={`${formId}-image`}
          name="image"
          onChange={handleChange}
          required
          type="url"
          value={formData.image}
        />
      </label>

      <label className="full-width" htmlFor={`${formId}-description`}>
        Description
        <textarea
          id={`${formId}-description`}
          name="description"
          onChange={handleChange}
          required
          rows="4"
          value={formData.description}
        />
      </label>

      <label className="checkbox-row" htmlFor={`${formId}-featured`}>
        <input
          checked={formData.featured}
          id={`${formId}-featured`}
          name="featured"
          onChange={handleChange}
          type="checkbox"
        />
        Featured product
      </label>

      <div className="form-actions full-width">
        <button className="button" disabled={isSaving} type="submit">
          {isSaving ? 'Saving...' : buttonLabel}
        </button>
        {message ? <p role="status">{message}</p> : null}
      </div>
    </form>
  )
}
