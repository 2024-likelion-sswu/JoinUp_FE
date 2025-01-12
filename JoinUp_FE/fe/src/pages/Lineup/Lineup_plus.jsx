import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../../assets/scss/section/Lineup/lineup_plus.scss";
import { FaCamera, FaSearch } from "react-icons/fa";

const LineupPlus = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [members, setMembers] = useState("");
  const [time, setTime] = useState(5);

  const navigate = useNavigate();

  const handleUpload = async () => {
    // 명세서에 따라 Body 데이터 구성
    const payload = {
      title,
      content,
      location,
      maxMembers: members, // 모집인원
      period: time, // 모집 기간
    };
  
    try {
      // 토큰 가져오기
      const token = localStorage.getItem("authToken");
  
      // POST 요청 보내기
      const response = await axios.post(
        "http://localhost:8080/recruit-posts", // 백엔드 엔드포인트
        payload, // Body 데이터
        {
          headers: {
            Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
          },
        }
      );
  
      console.log("Response:", response.data);
      alert("업로드되었습니다!");
      navigate("/home"); // 업로드 성공 후 Home으로 이동
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  const handleClose = () => {
    navigate("/home"); // Navigate to Home when close button is clicked
  };

  return (
    <div className="lineup-plus-container">
      <div className="header">
        <button className="close-button" onClick={handleClose}>×</button>
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
          <FaCamera className="camera-icon" />
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
              <div className="search-button">
                <FaSearch />
              </div>
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
        <label htmlFor="time">시간설정</label>
        <div className="time-select-container">
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="time-select"
          >
            {Array.from({ length: 12 }, (_, i) => 5 + i * 5).map((val) => (
              <option key={val} value={val}>
                {val}분
              </option>
            ))}
          </select>
          <p className="time-info">
            최소 5분에서 최대 60분까지 설정 가능합니다.
          </p>
        </div>
        <button className="upload-button" onClick={handleUpload}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default LineupPlus;
