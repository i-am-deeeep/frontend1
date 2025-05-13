import React, { useEffect, useRef, useState } from 'react'
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
  const [countPost, setCountPost] = useState<number>(0)
  const [deleted, setDeleted] = useState<boolean>(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const releaseDateRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const ratingRef = useRef<HTMLInputElement>(null)
  const platformRef = useRef<HTMLInputElement>(null)

  const url = `http://localhost:8000/show/${id}/`
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
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      release_date: releaseDateRef.current?.value,
      genre: genreRef.current?.value,
      rating: ratingRef.current?.value,
      platform: platformRef.current?.value,
    }
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlatform),
    })
    const data = await response.json()
    console.log('Updated Show:')
    console.log(data)
    titleRef.current!.value = ''
    descriptionRef.current!.value = ''
    releaseDateRef.current!.value = ''
    genreRef.current!.value = ''
    ratingRef.current!.value = ''
    platformRef.current!.value = ''
    setIsEditing(false)
    setCountPost((prev) => prev + 1)
  }
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
  const editElement = (
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" defaultValue={fetchedData.title} ref={titleRef}/>
      <label htmlFor="description">Url</label>
      <input type="text" id="description" defaultValue={fetchedData.description} ref={descriptionRef} />
      <label htmlFor="release_date">Release Date</label>
      <input type="text" id="release_date" defaultValue={fetchedData.release_date} ref={releaseDateRef} />
      <label htmlFor="genre">Genre</label>
      <input type="text" id="genre" defaultValue={fetchedData.genre} ref={genreRef} />
      <label htmlFor="rating">Rating</label>
      <input type="text" id="rating" defaultValue={fetchedData.rating} ref={ratingRef} />
      <label htmlFor="platform">Platform</label>
      <input type="text" id="platform" defaultValue={fetchedData.platform} ref={platformRef} />
      <button onClick={updatePlatform}>Save</button>
    </div>
  )
  if (deleted) {
    return (
      <div>
        <h1>Show Deleted</h1>
        <p>Show with ID {id}, Name {fetchedData.title} has been deleted.</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Show Details</h1>
      <button onClick={deleteShow}>Delete</button>
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
