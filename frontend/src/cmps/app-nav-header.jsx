import React, { useState } from "react";
// import React from "react"
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, signup, logout } from '../store/actions/user.action.js'
import { LoginSignup } from './login-signup.jsx'
import { UserMsg } from './user-msg.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import LogoutIcon from '@mui/icons-material/Logout';
import { LogoFull } from "../services/svg.service.js";
import LanguageIcon from '@mui/icons-material/Language';
import { SearchSite } from "./Search.jsx";

export const AppNavHeader = (props) => {

    const { user } = useSelector((storeState) => storeState.userModule)
    const { toys } = useSelector((storeState) => storeState.toyModule)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSignIn, setIsSignIn] = useState(false)
    const dispatch = useDispatch()

    const getSignOutBtnStyle = () => {
        return !isSignIn ? <button style={{ display: 'block' }} onClick={() => onLogout()}><LogoutIcon /></button> : <button style={{ display: 'none' }}></button>
    }

    const onLogin = (credentials, isSignIn) => {
        if (isSignIn) {
            return
        } else {
            dispatch(login(credentials))
            setIsSignIn(true)
        }
    }

    const onSignup = (credentials) => {
        dispatch(signup(credentials))
    }

    const onLogout = () => {
        dispatch(logout())
        setIsSignIn(false)
    }

    const onOpenModal = () => {
        if (user) return
        setIsModalOpen(true)
    }

    const onCloseModal = (ev) => {
        ev.preventDefault()
        setIsModalOpen(false)
    }

    return (

        <header className="header-nav">
            <section className="main-header-nav">
                <div className="logo-nav"><LogoFull /></div>
                <div className="main-link-nav">
                    <div className="main-nav">
                        <button className="home-link btn-light"><NavLink to="/">Home</NavLink></button>
                        <span className="line-sep"></span>
                        <button className="btn-light"><NavLink to="/toy"><div className="nav-link-txt">Toys</div></NavLink></button>
                        <span className="line-sep"></span>
                        <button className="btn-light"><NavLink to="/about">About</NavLink></button>
                        <span className="line-sep"></span>
                        <button className="btn-light"><NavLink to="/charts">Charts</NavLink></button>
                        <span className="line-sep"></span>
                        <button className="btn-light chat"><NavLink to="/chat">Chat</NavLink></button>
                        <span className="line-sep"></span>
                        {/* <div className="search-container btn-light"><SearchSite /></div> */}
                    </div>
                </div>
                <div className="user-actions-info">
                    <div className="sale-offers">
                        <button className="promo-btn"><span>Sale SUM2022</span></button>
                    </div>
                    <div className="lan-switch-container">
                        <button className="lang-switch"><LanguageIcon />
                        </button>
                    </div>
                    <div className="user-actions-login-out">
                        <div className="login-container">
                            <div className="login-btn-container">
                                <button onClick={() => onOpenModal()} className="login-btn user-btn"><AccountCircleIcon /><div className="user-dot"></div></button>
                                {isModalOpen && <Dialog open={true} >
                                    {!user && <LoginSignup onLogin={onLogin} onSignup={onSignup} onCloseModal={onCloseModal} />}</Dialog>}
                            </div>
                        </div>
                        <span className="line-sep"></span>
                        <div className="signup-btn-container ">
                            <button className="login-btn user-btn">
                                <i className="fa-solid fa-user-plus"></i></button>
                        </div>
                        <span className="line-sep"></span>
                        <div className="logout-btn-container">
                            {!user && <p className="user-greet">Welcome</p>}
                            {user && <p className="user-greet">Hello: <span>{user.username}</span></p>}
                            {user && <button className="user-logout user-btn" onClick={() => onLogout()}><LogoutIcon /></button>}
                        </div>
                        <span className="line-sep"></span>
                    </div>
                </div>
            </section>
        </header >
    )
}