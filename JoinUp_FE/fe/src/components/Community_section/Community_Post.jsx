import React, { useState } from 'react'
import GroupImg from '../../assets/images/GroupImg.svg'

const Community_Post = () => {

    const [posts, setPosts] = useState([
        {time : "3분전", location : "왕십리역 11번 출...", member : "1/5"},
        {time : "1시간전", location : "서울역 4번 출...", member : "2/5"},
        {time : "2시간전", location : "강남역 3번 출...", member : "3/5"}
    ])
  return (
    <div className='PostWrap'>
        {posts.map((post, index) => (
            <div key = {index} className='Post'>
                <p className='PostMin'>{post.time}</p>
                <p className='PostLocationLable'>위치</p>
                <p className='PostLocation'>{post.location}</p>
                <p className='PostRecruitLable'>모집인원</p>
                <div className='PostRecruitBox'>
                    <img className='PostRecruitBoxImg' src={GroupImg}/>
                    <p className='PostRecruitBoxText'>{post.member}</p>
                    <button className='PostRecruitBoxButton'>채팅하기</button>
                </div>
            </div>
        ))}
      </div>
  )
}

export default Community_Post
