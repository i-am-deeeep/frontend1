import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type showType = {
  id: number
  title: string
  description: string
  release_date: string
  genre: string
  rating: number
  platform: string
}

function ShowDetails() {
  const { id } = useParams()
  const [fetchedData, setFetchedData] = useState<showType>()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch(`http://localhost:8000/show/${id}/`)
      const data = await response.json()
      setFetchedData(data)
    }
    fetchShows()
  }, [id])
  if (!fetchedData) return <div>Loading...</div>
  const editElement = <div>Editing Form</div>
  return (
    <div>
      <h1>Show Details</h1>
      <button>Delete</button>
      <h2>{fetchedData.title}</h2>
      <p>Description: {fetchedData.description}</p>
      <p>Release Date: {fetchedData.release_date}</p>
      <p>Genre: {fetchedData.genre}</p>
      <p>Rating: {fetchedData.rating}</p>
      <p>Platform: {fetchedData.platform}</p>

        <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit'}
        </button>
        {isEditing ? editElement : null}
    </div>
  )
}

export default ShowDetails
