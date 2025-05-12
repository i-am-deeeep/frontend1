import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

type showType={
    id: number,
    title: string,
    description: string,
    release_date: string,
    genre: string,
    rating: number,
    platform: string
}
type showsListType = showType[]

function Shows() {
    const [fetchedData, setFetchedData] = React.useState<showsListType>([])
    useEffect(() => {
        const fetchShows = async () => {
            const response = await fetch('http://localhost:8000/show/list/')
            const data= await response.json()
            setFetchedData(data)
        }
        fetchShows()
    }, [])
  return (
    <div>
        <h1>Shows</h1>
        <ul>
            
        {fetchedData.map((show: showType) => (
            <li key={show.id}>
                <Link to={`/shows/${show.id}`}><h2>{show.title}</h2></Link>
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