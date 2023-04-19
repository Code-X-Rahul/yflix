import React from 'react'
import loading from '../assets/loading.webp'
import { Card } from '../components'

const Feed = ({ setSpinner, trendList, spinner, setVideoId, setMountFeed }) => {


    if (trendList?.data === undefined) {
        console.log('loading')
    }
    const list = trendList?.data;
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
            {spinner && <div className="loading flex">
                <img src={loading} alt="" />
            </div>}
            <div className="video-grid">
                {!spinner && cardLoop}
            </div>
        </>
    )
}

export default Feed;