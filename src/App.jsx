import './App.css'
import './styles/HeaderStyles.css'
import './styles/VideoStyles.css'
import './styles/responsive.css'
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Feed, Homepage, Video, Channel } from './pages';
import { Header, Navbar } from './components';

function App() {

  const [search, setSearch] = useState()
  const [videoList, setVideoList] = useState([])
  const [trendList, setTrendList] = useState()
  const [spinner, setSpinner] = useState(false);
  const [token, setToken] = useState('');
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

  useEffect(() => {
    if (search !== undefined && search !== "") {
      async function searchVideo() {
        setSpinner(true)
        const response = await fetch(`${apiUrl}/search?query=${search}`, options);
        const json = await response.json();
        setSpinner(false)
        setToken(json?.continuation)
        setVideoList([...json?.data]);
        navigate(`/search/${search}`)
      }
      searchVideo();
    } else {
      return
    }
  }, [search])


  useEffect(() => {
    setSpinner(true)
    async function fetchData() {
      const response = await fetch(`${apiUrl}/trending?geo=IN`, options);
      const json = await response.json();
      setTrendList(json?.data);
      setSpinner(false)
    }
    fetchData()
  }, [])

  return (

    <>
      {!spinner && <Header search={search} setSearch={setSearch} />}
      {/* {!spinner && <Navbar />} */}
      <Routes>
        <Route path="/" element={<Feed
          setSpinner={setSpinner}
          trendList={trendList}
          spinner={spinner}
        />} />
        <Route path="/search/:searchTerm" element={<Homepage
          setSpinner={setSpinner}
          videoList={videoList}
          setVideoList={setVideoList}
          spinner={spinner}
          token={token}
          setToken={setToken}
        />} />
        <Route path="/watch/:videoId" element={<Video spinner={spinner} setSpinner={setSpinner} token={token} setToken={setToken} />} />
        <Route path="/channel/:channelId" element={<Channel spinner={spinner} setSpinner={setSpinner} />} />
      </Routes>
    </>
  )
}

export default App
