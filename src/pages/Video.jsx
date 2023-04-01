import React, { useEffect ,useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
const Video = ({setSpinner ,spinner}) => {
  const { videoId } = useParams()
  const [videoInfo, setVideoInfo] = useState(null)



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
    fetchVideoInfo();
  }, [videoId])

  return (
    <>
      {!spinner && <div className='player'>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
          width='640px'
          height='360px'
          muted
          controls
        />
      </div>}
      {!spinner && <div className="about-video">
        <p>{videoInfo?.title}</p>
      </div>}
    </>
  )
}

export default Video