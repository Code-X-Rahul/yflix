import React from 'react';
import loading from '../assets/loading.webp'
import Card from '../components/Card';

const Homepage = ({ setSpinner ,spinner, videoList, setVideoId, watchVideo }) => {
  const list = videoList?.data;
  const cardLoop =
    list?.map(el => {
      return !spinner && <Card
        setSpinner={setSpinner}
        id={el?.videoId}
        spinner={spinner}
        key={Math.random() * 2000}
        dataObject={el}
        videoList={videoList}
        setVideoId={setVideoId}
      />
    })





  return (
    <div>
      {spinner && <div className="loading flex">
        <img src={loading} alt="" />
      </div>}
      <div className="video-grid">
        {cardLoop}
      </div>
    </div>
  )
}

export default Homepage