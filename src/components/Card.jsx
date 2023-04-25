import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ChannelPic from '../assets/person-circle-outline.svg'

const Card = ({ dataObject, setSpinner }) => {
    const [videoId, setVideoId] = useState()
    const [channelId, setChannelId] = useState()
    const navigate = useNavigate();


    let image = "";
    let videoTitle = "";
    let channelName = "";
    let cpf = "";
    if (dataObject.type === "video") {
        if (dataObject?.thumbnail !== undefined || null) {
            if (dataObject?.thumbnail[2] !== undefined || null) {
                image = dataObject?.thumbnail[2]?.url;
            } else if (dataObject?.thumbnail[1] !== undefined) {
                image = dataObject?.thumbnail[1].url;
            } else {
                image = dataObject?.thumbnail[0].url;
            }
        } else {
            image = ""
        }
        if (dataObject.channelThumbnail !== undefined) {
            cpf = dataObject?.channelThumbnail[0]?.url
        } else {
            cpf = ChannelPic;
        }
        videoTitle = dataObject?.title
        channelName = dataObject?.channelTitle
    } else {
        return
    }
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
    return (
        <div className="video-card">
            <div className="video-thumbnails">
                <img onClick={videoIdHandler} src={image} alt="Video Thumbnail" />
            </div>
            <div className={dataObject.channelThumbnail ? "video-info-grid" : 'styleForChannel'}>
                {dataObject.channelThumbnail && <div className="cpf">
                    <p onClick={channelIdHandler}><img src={dataObject.channelThumbnail ? cpf : ChannelPic} alt="" /></p>
                </div>}
                <div className="video-info">
                    <p className="video-title">
                        <a className='wrap-word' onClick={videoIdHandler}>{videoTitle}</a>
                    </p>
                    <p onClick={channelIdHandler} className="channel-name">{channelName}</p>
                    <p className="video-stats">{Number(dataObject?.viewCount).toLocaleString()} views ·{dataObject?.publishedTimeText}</p>
                </div>
            </div>
        </div>
    )
}

export default Card