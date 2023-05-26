import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ChannelPic from '../assets/person-circle-outline.svg'

const CardBs = ({ dataObject, setSpinner }) => {
    const [videoId, setVideoId] = useState()
    const [channelId, setChannelId] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        if (videoId === undefined) {
            return
        } else {
            setSpinner(true)
            navigate(`/watch/${videoId}`)
            setSpinner(false)
        }
    }, [videoId])

    useEffect(() => {
        if (channelId === undefined) {
            return
        } else {
            setSpinner(true)
            navigate(`/channel/${channelId}`)
            setSpinner(false)
        }
    }, [channelId])

    const videoIdHandler = () => {
        setVideoId(dataObject?.videoId)

    }
    const channelIdHandler = () => {
        setChannelId(dataObject?.channelId)
    }

    let image = "";
    let videoTitle = "";
    let channelName = "";
    if (dataObject.type === "video") {
        if (dataObject?.thumbnail !== undefined) {
            if (dataObject?.thumbnail[2] !== undefined) {
                image = dataObject?.thumbnail[2].url;
            } else if (dataObject?.thumbnail[1] !== undefined) {
                image = dataObject?.thumbnail[1].url;
            } else {
                image = dataObject?.thumbnail[0].url;
            }
        } else {
            image = ""
        }
        videoTitle = dataObject?.title
        channelName = dataObject?.channelTitle
    } else {
        return
    }
    return (
        <div className="card">
            <Link to={`/watch/${dataObject?.videoId}`} className="card-img-top">
                <img src={image} className="card-img-top" alt="..." />
            </Link>
            <div className="card-body">
                {/* <Link to={`/watch/${dataObject?.videoId}`} className="card-title wrap-word"> */}
                    <h5 onClick={videoIdHandler} className="card-title wrap-word">
                        {videoTitle}
                    </h5>
                {/* </Link> */}
                <p onClick={channelIdHandler} className="card-text channel-name">{channelName}</p>
                <p className="card-text video-stats">{Number(dataObject?.viewCount).toLocaleString()} views ·{dataObject?.publishedTimeText}</p>
            </div>
        </div>
    )
}

export default CardBs