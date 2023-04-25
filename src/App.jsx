import './App.css'
import './styles/HeaderStyles.css'
import './styles/VideoStyles.css'
import './styles/responsive.css'
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Feed,SearchPage , Video, Channel } from './pages';
import { Header } from './components';

function App() {
  const [spinner, setSpinner] = useState(false);
  const [token, setToken] = useState('');

  return (

    <>
      {!spinner && <Header />}
      <Routes>
        <Route path="/" element={<Feed
          setSpinner={setSpinner}
          spinner={spinner}
        />} />
        <Route path="/search/:searchTerm" element={<SearchPage
          setSpinner={setSpinner}
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
