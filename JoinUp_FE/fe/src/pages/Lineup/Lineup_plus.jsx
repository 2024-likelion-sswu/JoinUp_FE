import React, { useState } from "react";
import "../../assets/scss/section/Lineup/lineup_plus.scss";
import { FaCamera, FaSearch } from "react-icons/fa"; // React-icons 라이브러리 추가

const LineupPlus = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [members, setMembers] = useState("");

  const handleUpload = () => {
    // 업로드 로직 추가
    console.log({ title, content, location, members });
    alert("업로드되었습니다!");
  };

  return (
    <div className="lineup-plus-container">
      <div className="header">
        <button className="close-button">×</button>
        <span>글쓰기</span>
      </div>
      <div className="form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            placeholder="Input field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            placeholder="본문을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FaCamera className="camera-icon" /> {/* 카메라 아이콘 추가 */}
        </div>
        <div className="form-group-row">
          <div className="form-group">
            <label htmlFor="location">위치</label>
            <div className="location-input">
              <input
                type="text"
                id="location"
                placeholder="위치를 입력하세요"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="search-button">
                <FaSearch /> {/* 돋보기 아이콘 추가 */}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="members">모집인원</label>
            <input
              type="number"
              id="members"
              placeholder=""
              value={members}
              onChange={(e) => setMembers(e.target.value)}
            />
          </div>
        </div>
        <button className="upload-button" onClick={handleUpload}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default LineupPlus;
