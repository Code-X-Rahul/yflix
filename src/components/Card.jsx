import React from 'react'
import { Link } from 'react-router-dom';
import ChannelPic from '../assets/person-circle-outline.svg'

const Card = ({ dataObject }) => {

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


    return (
        <div className="video-card">
            <div className="video-thumbnails">
                <Link to={`/watch/${dataObject?.videoId}`}>
                    <img src={image} alt="Video Thumbnail" />
                </Link>
                <p className='video-length'>{dataObject?.lengthText}</p>
            </div>
            <div className={dataObject.channelThumbnail ? "video-info-grid" : 'styleForChannel'}>
                {dataObject.channelThumbnail && <div className="cpf">
                    <Link to={`/channel/${dataObject?.channelId}`}><img src={dataObject.channelThumbnail ? cpf : ChannelPic} alt="" /></Link>
                </div>}
                <div className="video-info">
                    <p className="video-title">
                        <Link to={`/watch/${dataObject?.videoId}`} className='wrap-word'>{videoTitle}</Link>
                    </p>
                    <Link to={`/channel/${dataObject?.channelId}`} className="channel-name">{channelName}</Link>
                    <p className="video-stats">{Number(dataObject?.viewCount).toLocaleString()} views ·{dataObject?.publishedTimeText}</p>
                </div>
            </div>
        </div>
    )
}

export default Card