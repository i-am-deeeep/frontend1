import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type showType = {
  id: number
  title: string
  description: string
  release_date: string
  genre: string
  rating: number
  platform: string
}
type showsListType = showType[]
const url = 'http://localhost:8000/show/list/'

function Shows() {
  const [fetchedData, setFetchedData] = useState<showsListType>([])
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [countPost, setCountPost] = useState<number>(0)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const releaseDateRef = useRef<HTMLInputElement>(null)
  const genreRef = useRef<HTMLInputElement>(null)
  const ratingRef = useRef<HTMLInputElement>(null)
  const platformRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const fetchShows = async () => {
      const response = await fetch(url)
      const data = await response.json()
      setFetchedData(data)
    }
    fetchShows()
  }, [countPost])
    const addShow = async () => {
        const newShow = {
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        release_date: releaseDateRef.current?.value,
        genre: genreRef.current?.value,
        rating: ratingRef.current?.value,
        platform: platformRef.current?.value
        }
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newShow)
        })
        const data = await response.json()
        console.log("New Show Created:")
        console.log(data)
        titleRef.current!.value = ''
        descriptionRef.current!.value = ''
        releaseDateRef.current!.value = ''
        genreRef.current!.value = ''
        ratingRef.current!.value = ''
        platformRef.current!.value = ''
        setIsAdding(false)
        setCountPost(prev=> prev + 1)
    }
  
  const addElement = (
    <div>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" ref={titleRef}/>
      <label htmlFor="description">Description</label>
      <input type="text" id="description" ref={descriptionRef}/>
      <label htmlFor="release_date">Release Date</label>
      <input type="text" id="release_date" ref={releaseDateRef}/>
      <label htmlFor="genre">Genre</label>
      <input type="text" id="genre" ref={genreRef}/>
      <label htmlFor="rating">Rating</label>
      <input type="text" id="rating" ref={ratingRef}/>
      <label htmlFor="platform">Platform</label>
      <input type="text" id="platform" ref={platformRef}/>
      <button onClick={addShow}>Save</button>
    </div>
  )
  return (
    <div>
      <h1>Shows</h1>
      <button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add'}
      </button>
      {isAdding ? addElement : null}
      <ul>
        {fetchedData.map((show: showType) => (
          <li key={show.id}>
            <Link to={`/shows/${show.id}`}>
              <h2>{show.title}</h2>
            </Link>
            <p>Description: {show.description}</p>
            <p>Release Date: {show.release_date}</p>
            <p>Genre: {show.genre}</p>
            <p>Rating: {show.rating}</p>
            <p>Platform: {show.platform}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Shows
