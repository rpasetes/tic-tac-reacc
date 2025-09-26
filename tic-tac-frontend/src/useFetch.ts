import { useEffect, useState } from "react"


// 1852 thanks andrew.. again
export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
      setLoading(false)
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [load, url])


  return { data, loading, error }
}