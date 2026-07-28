export const cleanImageUrl = (url?: string | string[] | null): string => {
  if (!url) {
    return 'https://placehold.co/600x400?text=No+Image'
  }

  const raw = Array.isArray(url) ? url[0] : url

  if (!raw || typeof raw !== 'string') {
    return 'https://placehold.co/600x400?text=No+Image'
  }

  let cleaned = raw.trim()

  // Handle strings wrapped in escaped JSON array format: '["https://..."]' or '"["https://..."]"'
  if (cleaned.startsWith('[') || cleaned.startsWith('"[')) {
    try {
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed) && parsed.length > 0) {
        cleaned = String(parsed[0])
      } else if (typeof parsed === 'string') {
        cleaned = parsed
      }
    } catch {
      // Fallback regex if JSON parsing fails
      const match = cleaned.match(/https?:\/\/[^\s"'\\]+/)
      if (match) {
        cleaned = match[0]
      }
    }
  }

  // Remove leading/trailing quotes, brackets, and backslashes
  cleaned = cleaned
    .replace(/^["'[\s]+|["'\]\s]+$/g, '')
    .replace(/\\"/g, '"')
    .replace(/\\/g, '')
    .trim()

  // Validate http / https URL scheme
  if (!/^https?:\/\//i.test(cleaned)) {
    return 'https://placehold.co/600x400?text=No+Image'
  }

  return cleaned
}
