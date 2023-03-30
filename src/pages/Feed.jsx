import React from 'react'
import loading from '../assets/loading.webp'
import { Card } from '../components'

const Feed = ({ trendList, spinner, setVideoId, watchVideo , setMountFeed }) => {
    const mountList = [
        {
            id: Math.random() * 2000,
            name: "now"
        },
        {
            id: Math.random() * 2000,
            name: "music"
        },
        {
            id: Math.random() * 2000,
            name: "games"
        },
        {
            id: Math.random() * 2000,
            name: "movies"
        },
    ]
    const mountLoop =
        mountList.map(item => {
            return <button onClick={e=>setMountFeed(e.target.value)} value={item.name} key={item.id}>{item.name}</button>
        })




    if (trendList?.data === undefined) {
        console.log('loading')
    }
    const list = trendList?.data;
    const cardLoop =
        list?.map(el => {
            return el && <Card
                // watchVideo={watchVideo}
                id={el?.videoId}
                setVideoId={setVideoId}
                spinner={spinner}
                key={Math.random() * 2000}
                dataObject={el}
            />
        })
    return (
        <>
            {spinner && <div className="loading flex">
                <img src={loading} alt="" />
            </div>}
            <div className="overlay-cat">
                {mountLoop}
            </div>
            <div className="video-grid">
                {!spinner && cardLoop}
            </div>
        </>
    )
}

export default Feed;