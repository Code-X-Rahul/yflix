import React from 'react'

const Card = ({ dataObject, id, watchVideo, setVideoId }) => {

    let image = "";
    let videoTitle = "";
    let channelName = "";
    let cpf = "";
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
        cpf = dataObject?.channelThumbnail[0]?.url
        videoTitle = dataObject?.title
        channelName = dataObject?.channelTitle
    } else {
        return
    }

    const videoIdHandler = () => {
        setVideoId()
        // watchVideo(dataObject?.videoId);

    }
    return (
        <div className="video-card">
            <div className="video-thumbnails">
                <a onClick={videoIdHandler}><img src={image} alt="" /></a>
            </div>
            <div className="video-info-grid">
                <div className="cpf">
                    <a href=""><img src={cpf} alt="" /></a>
                </div>
                <div className="video-info">
                    <p className="video-title">
                        <a href="">{videoTitle}</a>
                    </p>
                    <p className="channel-name">{channelName}</p>
                    {/* <p className="video-stats">{dataObject?.viewCount}M views · 6 months ago</p> */}
                </div>
            </div>
        </div>
    )
}

export default Card