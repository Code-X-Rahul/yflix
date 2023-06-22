import '../styles/videoPlayer.css'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import axios from 'axios'
import { CardBs, CommentBox } from '../components'
import InfiniteScroll from "react-infinite-scroll-component";
import loader from '../assets/Rolling-0.4s-207px.svg'


const Video = ({ setSpinner, spinner, token, setToken }) => {
  const { videoId } = useParams()
  const [videoInfo, setVideoInfo] = useState(null)
  const [suggestedVideo, setSuggestedVideo] = useState([])
  const [showDescription, setShowDescription] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const navigate = useNavigate();

  const description = videoInfo?.description;

  const apiUrl = import.meta.env.VITE_APP_API_URL
  const apiKey = import.meta.env.VITE_APP_API_KEY
  const apiHost = import.meta.env.VITE_APP_API_HOST


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
      setVideoInfo(json)
    }
    async function fetchSuggestedVideo() {
      const response = await fetch(`${apiUrl}/related?id=${videoId}`, options)
      const json = await response.json();
      setToken(json?.continuation)
      setSuggestedVideo([...json?.data])
    }
    async function fetchComments() {
      const response = await fetch(`${apiUrl}/comments?id=${videoId}`, options)
      const json = await response.json();
      setComments([...json?.data])
    }
    fetchVideoInfo();
    fetchSuggestedVideo();
    fetchComments();
    setSpinner(false);
  }, [videoId])

  const list = suggestedVideo
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

  const showDescriptionHandler = () => {
    setShowDescription(prev => !prev)
  }

  const fetchMoreData = () => {
    const options = {
      method: 'GET',
      url: 'https://yt-api.p.rapidapi.com/related',
      params: { id: videoId, token: token },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
      }
    };

    async function searchVideo() {
      if (token === '' || token === undefined) {
        return
      } else {
        axios.request(options).then(function (response) {
          setToken(response?.data?.continuation)
          setSuggestedVideo(prev => [...prev, ...response?.data.data]);
        }).catch(function (error) {
          alert(error);
        });
      }
    }
    searchVideo();
  };
  let items =
    description?.split('\n').map(function (item, idx) {
      return item
    })

  return (
    <>
      {spinner && <div className='flex loading-spinner full'><img src={loader} alt="Loading..." /></div>}
      {!spinner && <div className='wrapper'>
        <div className='main_video' id='player'>
          <div className='player'>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
              width='100%'
              height='100%'
              autoPlay
              controls
              origin='https://www.youtube.com'
            />
          </div>
          <div className="about-video">
            <p>{videoInfo?.title}</p>
            <span onClick={() => navigate(`/channel/${videoInfo?.channelId}`)} className='channelName'>{videoInfo?.channelTitle}</span>
          </div>
          <div className="video-desc">
            {videoInfo && <span>{Number(videoInfo?.viewCount).toLocaleString()} views</span>}
            {videoInfo && <span>{videoInfo?.publishDate}</span>}
            <p className={showDescription ? 'style' : 'para'}>{
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
          <div className={showComments ? 'showMobileComments' : "comment-wrapper"}>
            {comments !== undefined && comments.length !== 1 && <p className='comment-count'>{comments?.commentsCount} Comments</p>}
            {comments !== undefined && comments.length !== 0 && comments.map(el => {
              return el && <CommentBox
                data={el}
                key={el?.commentId}
              />
            })}
            <div div onClick={(e) => setShowComments(prev => !prev)} className='close'>
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
          </div>
          {!showComments && <div onClick={(e) => setShowComments(prev => !prev)} className='comment-div'>
            <p className='comment-count'>Comments</p>
            {comments.length !== 0 && <CommentBox data={comments[0]} />}
            <div className='open'>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
          </div>}
        </div>
        <div className="wrapper-absolute">
          <InfiniteScroll
            dataLength={list.length}
            next={fetchMoreData}
            hasMore={token !== ''}
            loader={<div className='flex loading-spinner'><img src={loader} alt="Loading..." /></div>}
          >
            <div className="grid-only">
              {cardLoop}
            </div>
          </InfiniteScroll>
        </div>
      </div >}
    </>
  )
}

export default Video