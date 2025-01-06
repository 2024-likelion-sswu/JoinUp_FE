import React from 'react'
import Ht from '../../assets/images/Ht.svg'
import CommentBtn from '../../assets/images/CommentBtn.svg'
import NOFILE from '../../assets/images/Camera.svg'

const PostList = ({title, content, like, comment}) => {
  return (
    <div className='PostListContainer'>
        <div className='PostBox'>
            <div className='PostImg'><img src={NOFILE}></img></div>
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
