import React, { useState } from 'react'
import BackBtn from '../../assets/images/BackBtn.svg'
import '../../assets/scss/section/Posting/post.scss'
import HotPost from '../../components/Post_section/HotPost'
import PostList from '../../components/Post_section/PostList'
import Icon from '../../assets/images/Icon.svg'
import { useNavigate } from 'react-router-dom'
const Post = () => {
    const navigate = useNavigate();
    const [postCount, setPostCount] = useState([
        {title : "동역사 2호선 -> 4호선 탑승", content : "지금 상왕십리역인데 동역사 지하철 몇분 후에 오나요?", like : 1, comment : 0},
        {title : "택시 탈 사람 있나?", content : "왕십리역이나 동역사에서 탈 예정임", like : 4, comment : 5},
        {title : "환승이슈", content : "환승 안하고 한번에 가고싶다.", like : 4, comment : 5 },
        {title : "택시 탈 사람 있나?", content : "왕십리역이나 동역사에서 탈 예정임", like : 1, comment : 0},
        {title : "환승이슈", content : "환승 안하고 한번에 가고싶다.", like : 4, comment : 5},
    ]);
    const handleMoveAddPost = () => {
        navigate('/addpost')
    }
  return (
    <div className='PostContainer'>
        <div className='PostHd'>
            <img src={BackBtn} className='PostBackBtn'></img>
            <div className='PostHdTxt'>2호선 게시판</div>
        </div>
        <HotPost/>
        <div style={{height : "443.5px"}}>
            {postCount.map((post, index) => (
                <PostList title ={post.title} content = {post.content} like = {post.like} comment = {post.comment} />
            ))}
        </div>
        <div className='AddPostBtn' onClick={() => handleMoveAddPost()}>
            <img src={Icon}></img>
        </div>
    </div>
  )
}
export default Post