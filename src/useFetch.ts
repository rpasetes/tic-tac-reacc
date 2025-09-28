import { useEffect, useState } from "react"


export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error, got status ${response.status}`)
        }

        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (url) {
      load()
    }
  }, [url])


  return { data, loading, error }
}