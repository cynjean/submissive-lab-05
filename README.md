# Commerce Control Lab

Commerce Control Lab is a React-based administrator portal for an e-commerce shop called Circuit Shelf. It includes a landing dashboard, product inventory search, product creation, product editing, and product deletion using a simulated backend.

## Features

- Responsive single-page React application built with Vite.
- Client-side routing for Dashboard, Products, Product Details, and Add Product pages.
- Shared product state with standard hooks and `useContext`.
- Custom `useProductSearch` hook for dynamic inventory filtering.
- Simulated backend with `json-server` and `db.json`.
- CRUD support: GET products, POST new products, PATCH product updates, and DELETE products.
- Vitest and React Testing Library tests for routing, searching, form submission, and updating products.
- Local Git history includes a main branch commit plus a merged documentation feature branch.

## Setup

Install dependencies:

```bash
npm install
```

Run the mock backend and React app together:

```bash
npm start
```

The React app runs at `http://localhost:5173` and the mock backend runs at `http://localhost:3001`.

## Scripts

```bash
npm run dev
npm run server
npm start
npm test
npm run build
```

## Project Structure

```text
src/
  components/
  context/
  hooks/
  pages/
  styles/
  test/
db.json
```

## Component Tree

```text
App
  Layout
    Dashboard
      StatusMessage
    Products
      StatusMessage
      ProductCard
    ProductDetails
      StatusMessage
      ProductForm
    NewProduct
      ProductForm

ProductProvider wraps App and supplies product state, store info, and CRUD actions.
useProductSearch manages the Products page search term and filtered product list.
```

## Known Limitations

The backend is simulated with `json-server`, so it is intended for local development and lab review rather than production hosting. Product image URLs are stored as text values instead of uploaded image files.
