import React, { useEffect } from 'react'

type platformType={
    id: number,
    name: string,
    url: string
}
type platformsListType = platformType[]

function Platforms() {
    const [fetchedData, setFetchedData] = React.useState<platformsListType>([])
    useEffect(() => {
        const fetchPlatforms = async () => {
            const response = await fetch('http://localhost:8000/platform/list/')
            const data= await response.json()
            setFetchedData(data)
        }
        fetchPlatforms()
    }, [])
  return (
    <div>
        <h1>Shows</h1>
        <ul>
            
        {fetchedData.map((platform: platformType) => (
            <li key={platform.id}>
                <h2>{platform.name}</h2>
                <a href={platform.url}>{platform.url}</a>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Platforms