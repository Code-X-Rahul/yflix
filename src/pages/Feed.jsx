import React, { useEffect, useState } from 'react'
import { Card } from '../components'
import loader from '../assets/Rolling-0.4s-207px.svg'



const Feed = ({ setSpinner, spinner }) => {
    const [trendList, setTrendList] = useState()

    // API
    const apiUrl = process.env.REACT_APP_API_URL
    const apiKey = process.env.REACT_APP_API_KEY
    const apiHost = process.env.REACT_APP_API_HOST

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        };
        setSpinner(true)
        async function fetchData() {
            const response = await fetch(`${apiUrl}/trending?geo=IN`, options);
            const json = await response.json();
            setTrendList(json?.data);
            setSpinner(false)
        }
        fetchData()
    }, [])

    const list = trendList;
    const cardLoop =
        list?.map(el => {
            return el && <Card
                setSpinner={setSpinner}
                id={el?.videoId}
                spinner={spinner}
                key={Math.random() * 2000}
                dataObject={el}
            />
        })

    return (
        <>
            {spinner && <div className='flex loading-spinner full'><img src={loader} alt="Loading..." /></div>}
            <div className="video-grid">
                {!spinner && cardLoop}
            </div>
        </>
    )
}

export default Feed;