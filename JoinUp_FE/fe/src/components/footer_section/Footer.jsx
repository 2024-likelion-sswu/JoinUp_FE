import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const footerItems = [
    {
      id: 0,
      link: '/home',
      renderSvg: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className='footer_icon'>
          <path d="M10 0.5C10.0396 0.5 10.0779 0.514106 10.1081 0.539785C10.1082 0.53986 10.1082 0.539936 10.1083 0.540011L19.5 8.58999V18C19.5 18.3978 19.342 18.7794 19.0607 19.0607C18.7794 19.342 18.3978 19.5 18 19.5H12.6667C12.6225 19.5 12.5801 19.4824 12.5488 19.4512L12.1953 19.8047L12.5488 19.4512C12.5176 19.4199 12.5 19.3775 12.5 19.3333V15.3333C12.5 14.6703 12.2366 14.0344 11.7678 13.5656C11.2989 13.0967 10.663 12.8333 10 12.8333C9.33696 12.8333 8.70107 13.0967 8.23223 13.5656C7.76339 14.0344 7.5 14.6703 7.5 15.3333V19.3333C7.5 19.3775 7.48244 19.4199 7.45119 19.4512L7.80474 19.8047L7.45118 19.4512C7.41993 19.4824 7.37754 19.5 7.33333 19.5H2C1.60218 19.5 1.22064 19.342 0.93934 19.0607C0.658035 18.7794 0.5 18.3978 0.5 18V8.58999L9.89167 0.54001C9.89174 0.539949 9.89181 0.539888 9.89188 0.539827C9.92204 0.514123 9.96037 0.5 10 0.5Z" stroke={isActive ? '#9A60D3' : '#A5A5A5'} />
        </svg>
      ),
      label: '홈'
    },
    {
      id: 1,
      link: '/community',
      renderSvg: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" className='footer_icon'>
          <path d="M15.5833 19.25V17.4167C15.5833 16.4442 15.197 15.5116 14.5094 14.8239C13.8217 14.1363 12.8891 13.75 11.9166 13.75H4.58329C3.61083 13.75 2.6782 14.1363 1.99057 14.8239C1.30293 15.5116 0.916626 16.4442 0.916626 17.4167V19.25" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.25004 10.0833C10.2751 10.0833 11.9167 8.44171 11.9167 6.41667C11.9167 4.39162 10.2751 2.75 8.25004 2.75C6.225 2.75 4.58337 4.39162 4.58337 6.41667C4.58337 8.44171 6.225 10.0833 8.25004 10.0833Z" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M21.0834 19.25V17.4166C21.0828 16.6042 20.8124 15.815 20.3146 15.1729C19.8169 14.5308 19.12 14.0722 18.3334 13.8691" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.6666 2.86914C15.4553 3.07108 16.1544 3.52978 16.6536 4.17293C17.1528 4.81607 17.4238 5.60707 17.4238 6.42122C17.4238 7.23538 17.1528 8.02638 16.6536 8.66952C16.1544 9.31266 15.4553 9.77136 14.6666 9.97331" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      label: '커뮤니티'
    },
    {
      id: 2,
      link: '/livechat',
      renderSvg: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none" className='footer_icon'>
          <path d="M18 9.02779C18.0032 10.2743 17.712 11.504 17.15 12.6167C16.4836 13.95 15.4592 15.0714 14.1915 15.8554C12.9237 16.6394 11.4628 17.055 9.97221 17.0556C8.72567 17.0588 7.49599 16.7676 6.38332 16.2056L1 18L2.79444 12.6167C2.23243 11.504 1.94119 10.2743 1.94444 9.02779C1.94502 7.53723 2.36058 6.07627 3.14456 4.80854C3.92855 3.54081 5.05001 2.51639 6.38332 1.85003C7.49599 1.28802 8.72567 0.996777 9.97221 1.00003H10.4444C12.413 1.10863 14.2723 1.93952 15.6664 3.33361C17.0605 4.7277 17.8914 6.58702 18 8.55557V9.02779Z" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      label: '채팅'
    },
    {
      id: 3,
      link: '/mypage',
      renderSvg: (isActive) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="19" viewBox="0 0 14 19" fill="none" className='footer_icon'>
          <path d="M3.02404 4.75003C3.02404 6.99003 4.75524 8.75005 6.82336 8.75005C8.89148 8.75005 10.6227 6.99003 10.6227 4.75003C10.6227 2.51003 8.89148 0.75 6.82336 0.75C4.75524 0.75 3.02404 2.51003 3.02404 4.75003Z" stroke={isActive ? '#9A60D3' : '#A5A5A5'} stroke-width="1.5" />
          <mask id="path-2-inside-1_43_337" fill="white">
            <path d="M6.82397 11.0833C10.591 11.0876 13.6438 14.275 13.6479 18.2083C13.6479 18.6455 13.3085 19 12.8897 19H0.758233C0.339482 19 2.47955e-05 18.6455 2.47955e-05 18.2083C0.00418282 14.275 3.05692 11.0876 6.82397 11.0833Z" />
          </mask>
          <path d="M6.82397 11.0833L6.82224 9.58325L6.82571 9.58325L6.82397 11.0833ZM13.6479 18.2083L15.1479 18.2067V18.2083H13.6479ZM2.47955e-05 18.2083L-1.49998 18.2083L-1.49998 18.2067L2.47955e-05 18.2083ZM6.82571 9.58325C11.4801 9.58866 15.1429 13.5078 15.1479 18.2067L12.148 18.2099C12.1446 15.0423 9.70198 12.5866 6.82223 12.5833L6.82571 9.58325ZM15.1479 18.2083C15.1479 19.4123 14.1973 20.5 12.8897 20.5V17.5C12.4197 17.5 12.1479 17.8788 12.1479 18.2083H15.1479ZM12.8897 20.5H0.758233V17.5H12.8897V20.5ZM0.758233 20.5C-0.549317 20.5 -1.49998 19.4123 -1.49998 18.2083H1.50002C1.50002 17.8788 1.22828 17.5 0.758233 17.5V20.5ZM-1.49998 18.2067C-1.49501 13.5078 2.16787 9.58862 6.82224 9.58325L6.8257 12.5833C3.94596 12.5866 1.50337 15.0423 1.50002 18.2099L-1.49998 18.2067Z" fill={isActive ? '#9A60D3' : '#A5A5A5'} mask="url(#path-2-inside-1_43_337)" />
        </svg>
      ),
      label: '마이'
    },
  ]

  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (link) => currentPath.includes(link);

  return (
    <div id='footer_container'>
      <div id="footer_inner_container">
        <div id="footer_inner_box">
          {footerItems.map((item, index) => (
            <Link to={item.link}>
              <div className={`footer_inner_item btn ${isActive(item.link) ? 'active' : ''}`} key={index}>
                <div className="footer_inner_icon">
                  {item.renderSvg(isActive(item.link))}
                </div>
                <span className="footer_inner_span">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer