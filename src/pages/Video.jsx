import '../styles/videoPlayer.css'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  const [comments, setComments] = useState([])
  const [commentToken, setCommentToken] = useState()


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
      setVideoInfo(json)
      setSpinner(false)
    }
    async function fetchSuggestedVideo() {
      const response = await fetch(`${apiUrl}/related?id=${videoId}`, options)
      const json = await response.json();
      setToken(json?.continuation)
      setSuggestedVideo([...json?.data])
      setSpinner(false)
    }
    async function fetchComments() {
      const response = await fetch(`${apiUrl}/comments?id=${videoId}`, options)
      const json = await response.json();
      setCommentToken(json?.continuation)
      console.log(commentToken)
      setComments([...json?.data])
      setSpinner(false)
    }
    fetchVideoInfo();
    fetchSuggestedVideo();
    fetchComments();
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
          console.error(error);
        });
      }
    }
    searchVideo();
  };

  return (
    <div className='wrapper'>
      <div className='main_video' id='player'>
        {!spinner && <div className='player'>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`}
            width='100%'
            height='100%'
            muted
            controls
            origin='https://www.youtube.com'
          />
        </div>}
        {!spinner && <div className="about-video">
          <p>{videoInfo?.title}</p>
          <p>{videoInfo?.title}</p>
        </div>}
        <div className="video-desc">
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
        <div className="comment-wrapper">
          {comments !== undefined && comments.length !== 1 && <p className='comment-count'>{comments?.commentsCount} Comments</p>}
          {comments !== undefined && comments.length !== 0 && comments.map(el => {
            return el && <CommentBox
              data={el}
              key={el?.commentId}
            />
          })}
        </div>
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
    </div>
  )
}

export default Video