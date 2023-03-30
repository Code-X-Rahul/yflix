import React, { useState } from 'react'
import '../styles/HeaderStyles.css'
import { hamburger, notificationsIcon, youtubeLogo, searchIcon, voiceSearchIcon, uploadIcon, myChannelIcon, youtubeAppsIcon, } from '../icons';

function Header({ searchVideo, search, setSearch }) {
    const [toggle, setToggle] = useState(false)

    const toggleHandle = () => {
        setToggle(prev => !prev);
    }
    const searchInputHandler = (e) => {
        if(e.target.value === ""){
            return
        }else{
            setSearch(e.target.value);
        }
    }

    return (
        <header className="header">
            <div className="relative">
                <div className="left-section">
                    <img className="hamburger-menu" src={hamburger} alt="" />
                    <a><img className="youtube-logo" src={youtubeLogo} alt="" /></a>
                </div>
                <form
                    onSubmit={searchVideo}
                    className="middle-section"
                >
                    <input
                        value={search}
                        onChange={searchInputHandler}
                        className="search-box"
                        type="text"
                        placeholder="Search"
                    />
                    <button type='submit' className="search-button">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                    <img className="voice-search-icon" src={voiceSearchIcon} alt="" />
                </form>
                <div className="right-section">
                    <button onClick={toggleHandle} className="search-button-mobile_only">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                    <div className="imgs" id="u-hide">
                        <img src={uploadIcon} alt="" className="upload-icon" />
                        <div className="tooltip">
                            Upload
                        </div>
                    </div>
                    <div className="imgs">
                        <img id="u-hide" src={youtubeAppsIcon} alt="" className="youtube-apps-icon" />
                        <div className="tooltip">
                            Youtube Apps
                        </div>
                    </div>
                    <div className="imgs notifications">
                        <img src={notificationsIcon} alt="" className="notification-icon" />
                        <div className="tooltip">
                            Notifications
                        </div>
                    </div>
                    <div className="imgs">
                        <img src={myChannelIcon} alt="" className="my-channel-icon" />
                    </div>
                </div>
                <form onSubmit={searchVideo} className={`hidden ${toggle && "mobile-search-bar-div"}`}>
                    <button onClick={toggleHandle} className="back"><ion-icon name="arrow-back-outline"></ion-icon></button>
                    <input value={search} onChange={searchInputHandler} type="text" className="search-bar-mobile" placeholder="Search" />
                    <button className="search-button mobile-btn">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                    <img className="voice-search-icon mobile_only" src={voiceSearchIcon} alt="" />
                </form>
            </div>
        </header>

    )
}

export default Header