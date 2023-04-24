import React from 'react'
import loading from '../assets/loading.webp'
import { Card } from '../components'
import InfiniteScroll from "react-infinite-scroll-component";


const Feed = ({ setSpinner, trendList, spinner }) => {
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