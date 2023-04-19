import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import '../styles/videoPlayer.css'
import { Card } from '../components'
import CardBs from '../components/CardBs'


const Video = ({ setSpinner, spinner }) => {
  const { videoId } = useParams()
  const [videoInfo, setVideoInfo] = useState(null)
  const [suggestedVideo, setSuggestedVideo] = useState(null)
  const [showDescription, setShowDescription] = useState(false)

  const description = videoInfo?.description;



  const apiUrl = process.env.REACT_APP_API_URL
  const apiKey = process.env.REACT_APP_API_KEY
  const apiHost = process.env.REACT_APP_API_HOST


  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };

  useEffect(() => {
    setSpinner(true)
    async function fetchVideoInfo() {
      const response = await fetch(`${apiUrl}/video/info?id=${videoId}`, options)
      const json = await response.json();
      setSpinner(false)
      setVideoInfo(json)
    }
    async function fetchSuggestedVideo() {
      const response = await fetch(`${apiUrl}/related?id=${videoId}`, options)
      const json = await response.json();
      setSpinner(false)
      setSuggestedVideo(json)
    }
    fetchVideoInfo();
    fetchSuggestedVideo();
  }, [videoId])

  const list = suggestedVideo?.data;
  const cardLoop =
    list?.map(el => {
      return <CardBs
        setSpinner={setSpinner}
        id={el.videoId}
        spinner={spinner}
        key={Math.random() * 2000}
        dataObject={el}
      />
    })


  const style = {
    height: "auto",
  }
  const showDescriptionHandler = () => {
    setShowDescription(prev => !prev)
  }

  return (
    <div className='wrapper'>
      <div className='main_video'>
        {!spinner && <div className='player'>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
            width='100%'
            height='100%'
            muted
            controls
          />
        </div>}
        {!spinner && <div className="about-video">
          <p>{videoInfo?.title}</p>
        </div>}
        <div className="video-desc">
          <p style={showDescription ? style : { height: "10vh" }}>{
            description?.split('\n').map(function (item, idx) {
              return (
                <span key={idx}>
                  {item}
                  <br />
                </span>
              )
            })
          }</p>
          <button className={!showDescription ? "showHideStyle more-btn" : 'more-btn'} onClick={showDescriptionHandler}>Show{showDescription ? " less" : " more"}</button>
        </div>
      </div>
      <div className="wrapper-absolute">
        <div className="grid-only">
          {cardLoop}
        </div>
      </div>
    </div>
  )
}

export default Video