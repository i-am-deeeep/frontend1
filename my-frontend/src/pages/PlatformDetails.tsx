import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

type platformType = {
  id: number
  name: string
  url: string
}
function PlatformDetails() {
  const { id } = useParams()
  const [fetchedData, setFetchedData] = useState<platformType>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [countPost, setCountPost] = useState<number>(0)
  const [deleted, setDeleted] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  const url = `http://localhost:8000/platform/${id}/`
  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setFetchedData(data)
    }
    fetchShows()
  }, [countPost])
  if (!fetchedData) return <div>Loading...</div>
  async function updatePlatform() {
    const updatedPlatform = {
      name: nameRef.current?.value,
      url: urlRef.current?.value,
    } 
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlatform),
    })
    const data = await response.json()
    console.log('Updated Platform:')
    console.log(data)
    nameRef.current!.value = ''
    urlRef.current!.value = ''
    setIsEditing(false)
    setCountPost((prev) => prev + 1)
  }
  const editElement = (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        defaultValue={fetchedData.name}
        ref={nameRef}
      />
      <label htmlFor="url">Url</label>
      <input type="text" id="url" defaultValue={fetchedData.url} ref={urlRef} />
      <button onClick={updatePlatform}>Save</button>
    </div>
  )
  const deleteShow = async () => {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(`Deleted Show: ${id}`)
    setDeleted(true)
  }
  if (deleted) {
    return (
      <div>
        <h1>Platform Deleted</h1>
        <p>
          Platform with ID {id}, Name {fetchedData.name} has been deleted.
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Platform Details</h1>
      <button onClick={deleteShow}>Delete</button>
      <h2>{fetchedData.name}</h2>
      URL: <a href={fetchedData.url}>{fetchedData.url}</a>
      <br />
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing ? editElement : null}
    </div>
  )
}

export default PlatformDetails
