import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProductProvider } from './context/ProductContext.jsx'

const products = [
  {
    id: 1,
    category: 'Lighting',
    description: 'Adjustable LED desk lamp',
    featured: true,
    image: 'https://example.com/lamp.jpg',
    name: 'Aurora Desk Lamp',
    price: 48.99,
    sku: 'LIGHT-AUR-100',
    stock: 28
  },
  {
    id: 2,
    category: 'Audio',
    description: 'Noise canceling headphones',
    featured: false,
    image: 'https://example.com/headphones.jpg',
    name: 'Focus Noise-Canceling Headphones',
    price: 129.99,
    sku: 'AUD-FOC-410',
    stock: 9
  }
]

const storeInfo = {
  id: 1,
  description: 'A focused admin portal for workspace gear.',
  email: 'admin@example.com',
  name: 'Circuit Shelf',
  phone_number: '555-0199'
}

function mockFetch() {
  global.fetch = vi.fn(async (url, options = {}) => {
    if (url.endsWith('/products') && !options.method) {
      return Response.json(products)
    }

    if (url.endsWith('/store_info/1')) {
      return Response.json(storeInfo)
    }

    if (url.endsWith('/products') && options.method === 'POST') {
      return Response.json({ id: 3, ...JSON.parse(options.body) })
    }

    if (url.endsWith('/products/1') && options.method === 'PATCH') {
      return Response.json({ ...products[0], ...JSON.parse(options.body) })
    }

    if (url.endsWith('/products/1') && options.method === 'DELETE') {
      return new Response(null, { status: 200 })
    }

    return new Response(null, { status: 404 })
  })
}

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </MemoryRouter>
  )
}

beforeEach(() => {
  mockFetch()
})

describe('Commerce Control app', () => {
  it('loads the dashboard summary from the mock API', async () => {
    renderApp()

    expect(await screen.findByRole('heading', { name: /circuit shelf/i })).toBeInTheDocument()
    expect(screen.getByText(/total products/i)).toBeInTheDocument()
    expect(screen.getByText(/low stock items/i)).toBeInTheDocument()
  })

  it('searches products dynamically', async () => {
    const user = userEvent.setup()
    renderApp('/products')

    await screen.findByRole('heading', { name: /products/i })
    await user.type(screen.getByLabelText(/search products/i), 'audio')

    expect(screen.getByText(/focus noise-canceling headphones/i)).toBeInTheDocument()
    expect(screen.queryByText(/aurora desk lamp/i)).not.toBeInTheDocument()
  })

  it('submits a new product with a POST request', async () => {
    const user = userEvent.setup()
    renderApp('/new')

    await user.type(screen.getByLabelText(/product name/i), 'Volt Stand')
    await user.type(screen.getByLabelText(/category/i), 'Accessories')
    await user.type(screen.getByLabelText(/sku/i), 'ACC-VOLT-001')
    await user.type(screen.getByLabelText(/price/i), '35')
    await user.type(screen.getByLabelText(/stock/i), '12')
    await user.type(screen.getByLabelText(/image url/i), 'https://example.com/stand.jpg')
    await user.type(screen.getByLabelText(/description/i), 'A compact stand for tablets and phones.')
    await user.click(screen.getByRole('button', { name: /add product/i }))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/products',
        expect.objectContaining({ method: 'POST' })
      )
    })
  })

  it('updates a product with a PATCH request', async () => {
    const user = userEvent.setup()
    renderApp('/products/1')

    const priceInput = await screen.findByLabelText(/quick price/i)
    await user.clear(priceInput)
    await user.type(priceInput, '52.75')
    await user.tab()

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3001/products/1',
        expect.objectContaining({ method: 'PATCH' })
      )
    })
  })
})
