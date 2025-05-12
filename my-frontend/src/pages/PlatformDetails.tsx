import React, { useEffect, useState } from 'react'
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
  
  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch(`http://localhost:8000/platform/${id}/`)
      const data = await response.json()
      setFetchedData(data)
    }
    fetchShows()
  }, [id])
  if (!fetchedData) return <div>Loading...</div>
  const editElement = <div>Editing Form</div>
  return (
    <div>
      <h1>Platform Details</h1>
      <button>Delete</button>
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
