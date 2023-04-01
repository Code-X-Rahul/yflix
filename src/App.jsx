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
  const [search, setSearch] = useState()
  const [videoList, setVideoList] = useState(null)
  const [trendList, setTrendList] = useState(null)
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

  useEffect(()=>{
    if(search !== undefined && search !== ""){
    async function searchVideo() {
      setSpinner(true)
      const response = await fetch(`${apiUrl}/search?query=${search}`, options);
      const json = await response.json();
      setSpinner(false)
      setVideoList(json);
      navigate(`/search/${search}`)
    }
    searchVideo();
  }else{
    return
  }
  },[search])

 
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



  return (

    <div>
      {!spinner && <Header search={search} setSearch={setSearch} />}
      {/* {!spinner && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Feed
          setSpinner={setSpinner}
          setMountFeed={setMountFeed}
          mountFeed={mountFeed}
          trendList={trendList}
          spinner={spinner}
        />} />
        <Route path="/search/:searchTerm" element={<Homepage
          setSpinner={setSpinner}
          videoList={videoList}
          spinner={spinner}
        />} />
        <Route path="/watch/:videoId" element={<Video spinner={spinner} setSpinner={setSpinner}/>} />
      </Routes>
    </div>
  )
}

export default App
