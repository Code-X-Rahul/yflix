import React from 'react'
import ReactPlayer from 'react-player'
const Video = ({ videoId , videoInfo }) => {
  return (
    <>
      <div className='player'>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
          width='640px'
          height='360px'
          muted
          controls
        />
      </div>
      <div className="about-video">
        <p>{videoInfo?.title}</p>
      </div>
    </>
  )
}

export default Video