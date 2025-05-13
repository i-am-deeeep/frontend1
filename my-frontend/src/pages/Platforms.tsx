import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type platformType = {
  id: number
  name: string
  url: string
}
type platformsListType = platformType[]
const url = 'http://localhost:8000/platform/list/'

function Platforms() {
  const [fetchedData, setFetchedData] = useState<platformsListType>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [countPost, setCountPost] = useState<number>(0)
  const nameRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const fetchPlatforms = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setFetchedData(data)
    }
    fetchPlatforms()
  }, [countPost])
  const addPlatform = async () => {
    const newPlatform = {
      name: nameRef.current?.value,
      url: urlRef.current?.value,
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlatform),
    })
    const data = await response.json()
    console.log('New Platform Created:')
    console.log(data)
    nameRef.current!.value = ''
    urlRef.current!.value = ''
    setIsAdding(false)
    setCountPost((prev) => prev + 1)
  }
  const addElement = (
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" ref={nameRef} />
      <label htmlFor="url">Url</label>
      <input type="text" id="url" ref={urlRef} />
      <button onClick={addPlatform}>Save</button>
    </div>
  )
  return (
    <div>
      <h1>Platforms</h1>
      <button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add'}
      </button>
      {isAdding ? addElement : null}
      <ul>
        {fetchedData.map((platform: platformType) => (
          <li key={platform.id}>
            <Link to={`/platforms/${platform.id}`}>
              <h2>{platform.name}</h2>
            </Link>
            URL: <a href={platform.url}>{platform.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Platforms
