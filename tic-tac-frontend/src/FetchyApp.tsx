import { useEffect, useState } from "react"


function useFetch<T>(path: string) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  
  async function getData() {
    const res = await fetch(path)
    console.log(res)
    const data = await res.json()
    console.log(data)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    try {
      getData()
    } catch(e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }, [])

  return {data, loading, error, setData}
}


function FetchByHand() {
  const [data, setData] = useState<{user: string} | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)
  
  async function getData() {
    const res = await fetch('http://localhost:3000/data')
    console.log(res)
    const data = await res.json()
    console.log(data)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    try {
      getData()
    } catch(e) {
      console.log(e)
      setError(e)
      setLoading(false)
    }
  }, [])

  if(loading) return <div>loading</div>
  if(error) return <div>{error}</div>
  if(data) return (
    <div>
      {data.user}
    </div>
  )
  return <div>fallback</div>
}

type UserData = {
  user: string
}

function FetchByCustomHook() {
  const {data, loading, error, setData} = useFetch<UserData>('/data')
  const {data: data2, loading: msgLoading, error: msgError, setData: msgSetData} = useFetch<string>('/message')

  if(loading) return <div>loading</div>
  if(error) return <div>{error}</div>
  if(data) return (
    <div>
      {data.user}
    </div>
  )
  return <div>fallback</div>
}

function FetchyApp() {

  return (
    <>
      <h1>Demonstrate how to use query and fetch and use effect and custom hooks.</h1>
      <h1>fetch by hand</h1>
      <FetchByHand />
      <h1>fetch by custom hook</h1>
      <FetchByCustomHook />
      {/* <FetchByReactQuery /> */}
    </>
  )
}

export default FetchyApp