import React, { useState } from 'react'
import Checking from '../../assets/images/Checking.svg'

const Community_Notice = () => {
    const [notices, setNotices] = useState([
        {title : "2호선 게시판"},
        {title : "정보 게시판"},
        {title : "자유 게시판"},
        {title : "비밀 게시판"},
        {title : "5호선 게시판"},
        {title : "6호선 게시판"},
        
    ])
  return (
    <>
    <div className='NoticeLable'>게시판</div>
    <div className='NoticeWrap'>
    {notices.map((notice, index) => (
        <>
        <div className='Notice'>
            <img className='NoticeImg' src={Checking} />
            <p className='NoticeTitle'>{notice.title}</p>
            <button className='NoticeButton'>바로 가기</button>
            
        </div>
        {index !== notices.length -1 ? <div className='Line'></div> : <></>}
        </>
            )
        )
    }
    </div>
    </>
  )
}

export default Community_Notice
