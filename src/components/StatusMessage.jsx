export default function StatusMessage({ error, status }) {
  if (status === 'loading') {
    return <p className="status-message">Loading store data...</p>
  }

  if (status === 'error') {
    return (
      <p className="status-message error" role="alert">
        {error || 'Something went wrong while loading the store.'}
      </p>
    )
  }

  return null
}
