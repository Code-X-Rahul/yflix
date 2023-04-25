import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/channelstyles.css'
import { Card } from '../components'
import loader from '../assets/Rolling-0.4s-207px.svg'


const Channel = ({ setSpinner, spinner }) => {
    const { channelId } = useParams()
    const [channelInfo, setChannelInfo] = useState()

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
        async function fetchChannelInfo() {
            try {
                const response = await fetch(`${apiUrl}/channel/home?id=${channelId}`, options)
                const json = await response.json();
                setSpinner(false)
                setChannelInfo(json)
            } catch (error) {
                alert(error);
            }
        }
        fetchChannelInfo();
    }, [channelId])
    const metaData = channelInfo?.meta


    const list = channelInfo?.data;
    const cardLoop =
        list?.map(el => {
            return el.type === 'video_listing' && el.data.map(els => {
                return <Card
                    setSpinner={setSpinner}
                    id={els.videoId}
                    spinner={spinner}
                    key={Math.random() * 2000}
                    dataObject={els}
                />
            })
        })
    return (
        <>
            {spinner && <div className='flex loading-spinner full'><img src={loader} alt="Loading..." /></div>}

            <div className='channel-container'>
                {metaData?.banner && <div className="banner flex">
                    <img src={metaData?.banner[0].url} alt="" />
                </div>}
                {metaData && !spinner && <div className={metaData?.banner ? "channel-details flex" : "channel-details-woBanner flex"}>
                    <div className="channel-sub-details">
                        <div className="details-left">
                            <div className="channel-image">
                                <img src={metaData?.avatar[2]?.url} alt="" />
                            </div>
                        </div>
                        <div className="detail-box flex">
                            <h1>{metaData?.title}</h1>
                            <div className="all-counts flex">
                                <p>{metaData?.channelHandle}</p>
                                <p>{metaData?.subscriberCountText} subscribers</p>
                            </div>
                            <div className="ch-des">
                                <p className='desc-text'>{metaData?.description}</p>
                                <div className="desc-link flex">
                                    <ion-icon name="chevron-forward-outline"></ion-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                {!spinner && <div className="channel-nav flex">
                    <h3>Videos</h3>
                </div>}
                <div className="flex">
                    <div className="video-grid videos-listing">
                        {!spinner && cardLoop}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Channel