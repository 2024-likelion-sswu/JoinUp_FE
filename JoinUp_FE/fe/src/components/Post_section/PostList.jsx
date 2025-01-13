import React from 'react'
import Ht from '../../assets/images/Ht.svg'
import CommentBtn from '../../assets/images/CommentBtn.svg'
import Img9 from '../../assets/images/Img9.png'
const PostList = ({title, content, like, comment}) => {
  return (
    <div className='PostListContainer'>
        <div className='PostBox'>
            <div className='PostImg'><img src={Img9}></img></div>
            <div className='PostDetail'>
                <div className='PostTitle'>{title}</div>
                <div className='Posting'>{content}</div>
                <div className='PostFeeling'>
                    <img className='PostHt' src={Ht}></img>
                    <p>{like}</p>
                    <img className='PostCmt' src={CommentBtn}></img>
                    <p>{comment}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
export default PostList