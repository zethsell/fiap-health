export function formatTypeOrmException(err: any) {
  if (err?.detail) {
    if (err?.detail.includes('already exists')) {
      const startChar = err.detail.indexOf('(') + 1
      const endChar = err.detail.indexOf(')')
      const field = err.detail.slice(startChar, endChar)
      return field.length > 0 ? `${field} must be unique` : err.detail
    }
    return err.detail
  }
  return err
}
