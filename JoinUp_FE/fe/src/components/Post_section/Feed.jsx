import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Ht from '../../assets/images/Ht.svg';
import CommentBtn from '../../assets/images/CommentBtn.svg';
import SendBtn from '../../assets/images/SendBtn.svg';
import BackBtn from '../../assets/images/BackBtn.svg';
import '../../assets/scss/section/Posting/Feed.scss';
import axios from 'axios';

const Feed = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 postId를 가져옴

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  // 뒤로 가는 함수
  const handleBack = () => {
    navigate(-1); // 한 단계 뒤로 가기
  };

  // 댓글을 전송하는 함수
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // 댓글을 처리하는 로직 (예: 서버에 전송)
      console.log('댓글 전송:', comment);
      setComment(''); // 댓글 입력란 초기화
    }
  };

  // 게시글 데이터를 가져오는 함수
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('authToken'); // 토큰 가져오기
      const response = await axios.get(`http://localhost:8080/community/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setPost(response.data.data); // 게시글 데이터를 state에 설정
    } catch (error) {
      console.error('게시글을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchPost(); // 컴포넌트 마운트 시 게시글 가져오기
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 화면 표시
  }

  const { title, content, imageUrl, likes } = post;

  return (
    <div className='FeedContainer'>
      <div className='FeedHd'>
        <img src={BackBtn} className='PostBackBtn' onClick={handleBack} alt="Back" />
        <div className='PostHdTxt'>{title}</div>
      </div>
      <div className='FeedTitleBox'>
        <div className='FeedTitle'>{title}</div>
      </div>
      <div className='Line'></div>
      <div className='FeedContentBox'>
        <div className='FeedContentTxt'>{content}</div>
        {imageUrl && <div className='FeedContentImg'><img src={imageUrl} alt="Post" /></div>}
      </div>
      <div className='FeedReactBox'>
        <div className='FeedLikeBtn'>
          <img src={Ht} alt="Like" />
          <span>{likes}</span> {/* 예시로 좋아요 수를 표시 */}
        </div>
        <div className='FeedCommentBtn'>
          <img src={CommentBtn} alt="Comment" />
        </div>
      </div>
      {/* 댓글 입력 */}
      <div className='FeedCommentInput'>
        <input
          className='FeedCommentInputBox'
          placeholder='댓글을 입력해주세요.'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <img
          className='FeedCommentImg'
          src={SendBtn}
          alt="Send"
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default Feed;
