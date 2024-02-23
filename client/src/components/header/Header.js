import React from 'react'

export default function Header() {
    const logOutUser = () =>{
        localStorage.setItem("userTrue", false)
        window.location.replace('/');
      }
  return (
    
    <>
    <div className="navbar-container">
        <div className="navbar-left-item">
            <div className="logo">MyMern</div>
        </div>
        <div className="navbar-center-item">
            <a href="">Home</a>
            <a href="">Blogs</a>
            <a href="">User</a>
        </div>
        <div className="navbar-right-item">
            <p onClick={logOutUser}>Logout</p>
        </div>
    </div>
    </>
  )
}
