import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext.jsx'

export function renderWithProviders(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route)

  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProductProvider>{ui}</ProductProvider>
    </MemoryRouter>
  )
}
