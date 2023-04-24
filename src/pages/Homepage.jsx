import React, { useState } from 'react';
import loading from '../assets/loading.webp'
import Card from '../components/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

const Homepage = ({ setSpinner, spinner, videoList, setVideoList, token, setToken }) => {
  const list = videoList;
  const cardLoop =
    list?.map(el => {
      return !spinner && <Card
        setSpinner={setSpinner}
        id={el?.videoId}
        spinner={spinner}
        key={Math.random() * 2000}
        dataObject={el}
        videoList={videoList}
      />
    })

  const apiUrl = process.env.REACT_APP_API_URL
  const apiKey = process.env.REACT_APP_API_KEY
  const apiHost = process.env.REACT_APP_API_HOST

  const options = {
    method: 'GET',
    url: 'https://yt-api.p.rapidapi.com/search',
    params: { query: 'cat', token: token },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': apiHost
    }
  };

  const fetchMoreData = () => {
    async function searchVideo() {
      axios.request(options).then(function (response) {
        console.log(response.data);
        setVideoList(prev => [...prev, ...response?.data.data]);
        setToken(response?.data?.continuation)
      }).catch(function (error) {
        console.error(error);
      });
    }
    searchVideo();
  };
  return (
    <div>
      {spinner && <div className="loading flex">
        <img src={loading} alt="" />
      </div>}
      <InfiniteScroll
        dataLength={list.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="video-grid">
          {cardLoop}
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default Homepage