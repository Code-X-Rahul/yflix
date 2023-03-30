import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import './styles/HeaderStyles.css'
import './styles/VideoStyles.css'
import './styles/responsive.css'
import Homepage from './pages/Homepage';
import { Header, Navbar } from './components';
import Feed from './pages/Feed';
import Video from './pages/Video';

function App() {

  const [mountFeed, setMountFeed] = useState("Now")
  const [search, setSearch] = useState("")
  const [videoList, setVideoList] = useState(null)
  const [trendList, setTrendList] = useState(null)
  const [videoId, setVideoId] = useState(null)
  const [videoInfo, setVideoInfo] = useState(null)
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  // API

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



  async function searchVideo(e) {
    e.preventDefault();
    setSpinner(true)

    const response = await fetch(`${apiUrl}/search?query=${search}`, options);
    const json = await response.json();
    setSpinner(false)
    console.log(json)
    setVideoList(json);

    navigate(`/search/${search}`)

  }
  useEffect(() => {
    setSpinner(true)

    async function fetchData() {

      const response = await fetch(`${apiUrl}/trending?geo=IN&type=${mountFeed}`, options);
      const json = await response.json();
      setSpinner(false)
      setTrendList(json);
    }
    fetchData()
  }, [mountFeed])

  useEffect(() => {
    // const watchVideo = (param) => {
    setSpinner(true)
    async function fetchVideoInfo() {
      const response = await fetch(`${apiUrl}/video/info?id=${videoId}`, options)
      const json = await response.json();
      setSpinner(false)
      setVideoInfo(json);
      navigate(`/watch/${videoId}`)
      console.log(json)
    }
    fetchVideoInfo();
    // }
  }, [videoId])


  return (

    <div>
      {!spinner && <Header searchVideo={searchVideo} search={search} setSearch={setSearch} />}
      {/* {!spinner && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Feed
          setMountFeed={setMountFeed}
          mountFeed={mountFeed}
          // watchVideo={watchVideo}
          setVideoId={setVideoId}
          videoId={videoId}
          trendList={trendList}
          searchVideo={searchVideo}
          setSearch={search}
          search={search}
          spinner={spinner}
        />} />
        <Route path="/search/:searchTerm" element={<Homepage
          // watchVideo={watchVideo}
          search={search}
          searchVideo={searchVideo}
          videoId={videoId}
          videoList={videoList}
          setSearch={setSearch}
          setVideoId={setVideoId}
          spinner={spinner}
        />} />
        <Route path="/watch/:videoId" element={<Video videoInfo={videoInfo} videoId={videoId} />} />
      </Routes>
    </div>
  )
}

export default App
