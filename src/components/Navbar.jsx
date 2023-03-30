import React from 'react'
import '../styles/HeaderStyles.css'
import { homeIcon , exploreIcon , subscriptionIcon , originalsIcon , libraryIcon ,youtubeMusicIcon } from '../icons';

const Navbar = () => {
    return (
        <nav className="sidebar">
            <div className="sidebar-link">
                <a href="index.html"><img src={homeIcon} alt=""/></a>
                <div>Home</div>
            </div>

            <div className="sidebar-link">
                <img src={exploreIcon} alt=""/>
                    <div>Explore</div>
            </div>

            <div className="sidebar-link">
                <a href="https://www.youtube.com/feed/subscriptions"><img src={subscriptionIcon} alt=""/></a>
                <div>Subscriptions</div>
            </div>

            <div className="sidebar-link">
                <img src={originalsIcon} alt=""/>
                    <div>Originals</div>
            </div>

            <div className="sidebar-link">
                <a href="https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ"><img src={youtubeMusicIcon}
                    alt=""/></a>
                <div>Youtube Music</div>
            </div>
            <div className="sidebar-link">
                <a href="https://www.youtube.com/feed/library"><img src={libraryIcon} alt=""/></a>
                <div>Library</div>
            </div>
        </nav>
    )
}

export default Navbar