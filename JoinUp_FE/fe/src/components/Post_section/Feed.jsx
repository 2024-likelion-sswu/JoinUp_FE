import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Ht from "../../assets/images/Ht.svg";
import CommentBtn from "../../assets/images/CommentBtn.svg";
import SendBtn from "../../assets/images/SendBtn.svg";
import BackBtn from "../../assets/images/BackBtn.svg";
import "../../assets/scss/section/Posting/Feed.scss";

const Feed = () => {
  const navigate = useNavigate();
  const location = useLocation(); // location 객체를 통해 state에 접근
  const { Img, title, content, like, comment } = location.state || {}; // 전달된 state를 받아옵니다

  const [commentInput, setCommentInput] = useState("");

  // 뒤로 가는 함수
  const handleBack = () => {
    navigate(-1); // 한 단계 뒤로 가기
  };

  // 댓글을 전송하는 함수
  const handleCommentSubmit = () => {
    if (commentInput.trim()) {
      // 댓글을 처리하는 로직 (예: 서버에 전송)
      console.log("댓글 전송:", commentInput);
      setCommentInput(""); // 댓글 입력란 초기화
    }
  };

  return (
    <div className="FeedContainer" style={{height: "90vh"}}>
      <div className="FeedHd">
        <img
          src={BackBtn}
          className="PostBackBtn"
          onClick={handleBack}
          alt="Back"
        />
        <div className="PostHdTxt">2호선 게시판</div>
      </div>
      <div className="Line"></div>
      <div className="FeedTitleBox">
        <div className="FeedTitle">{title}</div>
      </div>
      <div className="FeedContentBox">
        <div className="FeedContentTxt">{content}</div>
        {Img && (
          <div className="FeedContentImg">
            <img src={Img} alt="Post" className="FeedImgbox" />
          </div>
        )}
      </div>
      <div className="FeedReactBox">
        <div className="FeedLikeBtn">
          <img src={Ht} alt="Like" />
          <span>{like}</span> {/* 예시로 좋아요 수를 표시 */}
        </div>
        <div className="FeedCommentBtn">
          <img src={CommentBtn} alt="Comment" />
        </div>
      </div>
      {/* 댓글 입력 */}
      <div className="FeedCommentInput">
        <input
          className="FeedCommentInputBox"
          placeholder="댓글을 입력해주세요."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <img
          className="FeedCommentImg"
          src={SendBtn}
          alt="Send"
          onClick={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default Feed;
