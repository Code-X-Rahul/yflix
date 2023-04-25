import React, { useState, useRef } from 'react'
import '../styles/HeaderStyles.css'
import { searchIcon } from '../icons';
import Logo from '../assets/logo.webp'
import { Link, useNavigate } from 'react-router-dom';

function Header({ setSearch }) {
    const [toggle, setToggle] = useState(false)
    const searchInputRef = useRef()
    const searchInputRef2 = useRef()
    const navigate = useNavigate();

    const toggleHandle = () => {
        setToggle(prev => !prev);
    }
    const searchInputHandler = (e) => {
        e.preventDefault();
        if (searchInputRef.current.value === "") {
            return
        } else {
            // setSearch(searchInputRef.current.value);
            navigate(`/search/${searchInputRef.current.value}`)
        }
    }
    const searchInputHandler2 = (e) => {
        e.preventDefault();
        if (searchInputRef2.current.value === "") {
            return
        } else {
            setSearch(searchInputRef2.current.value);
        }
    }

    return (
        <header className="header">
            <div className="relative">
                <div className="left-section">
                    <Link to='/'><img className="youtube-logo" src={Logo} alt="" /></Link>
                    <Link to='/' className='logo_text'>Y-flix</Link>
                </div>
                <form
                    onSubmit={searchInputHandler}
                    className="middle-section"
                >
                    <input
                        ref={searchInputRef}
                        className="search-box"
                        type="text"
                        placeholder="Search"
                    />
                    <button type='submit' className="search-button">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                </form>
                <div className="right-section">
                    <button onClick={toggleHandle} className="search-button-mobile_only">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                </div>
                <form onSubmit={searchInputHandler2} className={`hidden ${toggle && "mobile-search-bar-div"}`}>
                    <button type='button' onClick={toggleHandle} className="back">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </button>
                    <input ref={searchInputRef2} type="text" className="search-bar-mobile" placeholder="Search" />
                    <button type='submit' className="search-button mobile-btn">
                        <img className="search-icon" src={searchIcon} alt="" />
                    </button>
                </form>
            </div>
        </header>

    )
}

export default Header