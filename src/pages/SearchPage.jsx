import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import loader from '../assets/Rolling-0.4s-207px.svg'
import { useParams } from 'react-router-dom';

const SearchPage = ({ setSpinner, spinner, token, setToken }) => {
  const [videoList, setVideoList] = useState([])
  const { searchTerm } = useParams()

  //API
  const apiUrl = process.env.REACT_APP_API_URL
  const apiKey = process.env.REACT_APP_API_KEY
  const apiHost = process.env.REACT_APP_API_HOST

  useEffect(() => {
    const optionss = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
      }
    };

    async function searchVideo() {
      setSpinner(true)
      const response = await fetch(`${apiUrl}/search?query=${searchTerm}`, optionss);
      const json = await response.json();
      setSpinner(false)
      setToken(json?.continuation)
      setVideoList([...json?.data]);
    }
    searchVideo();
  }, [searchTerm])

  const fetchMoreData = () => {
    async function searchVideo() {
      const options = {
        method: 'GET',
        url: 'https://yt-api.p.rapidapi.com/search',
        params: { query: searchTerm, token: token },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost
        }
      };
      axios.request(options).then(function (response) {
        setVideoList(prev => [...prev, ...response?.data.data]);
        setToken(response?.data?.continuation)
      }).catch(function (error) {
        alert(error);
      });
    }
    searchVideo();
  };
  //Data

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

  return (
    <div>
      {spinner && <div className='flex loading-spinner full'><img src={loader} alt="Loading..." /></div>}
      {!spinner && <InfiniteScroll
        dataLength={list.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<div className='flex loading-spinner'><img src={loader} alt="Loading..." /></div>}
      >
        <div className="video-grid">
          {cardLoop}
        </div>
      </InfiniteScroll>}
    </div>
  )
}

export default SearchPage;