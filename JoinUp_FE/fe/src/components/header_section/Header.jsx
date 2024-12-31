import React from 'react'

const Header = ({ title }) => {
  return (
    <div id='header_container'>
      <div id="header_inner_container">
        <div id="header_inner_box">
          <div className="header_inner_back">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="18" viewBox="0 0 10 18" fill="none" className='header_back_icon btn'>
              <path d="M9 1L1 9L9 17" stroke="#333333" stroke-linecap="round" />
            </svg>
          </div>
          <span className="header_inner_title">{title}</span>
          <div className="header_inner_blank"></div>
        </div>
      </div>
    </div>
  )
}

export default Header