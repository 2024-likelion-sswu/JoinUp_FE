import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/section/Lineup/home.scss";
import { FaChevronRight, FaPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

const Home = ({ onClick }) => {
  const [likedStops, setLikedStops] = useState([]); // 좋아요한 정류장
  const [activePage, setActivePage] = useState(0);
  const [queueData, setQueueData] = useState([]); // 모집 글 데이터를 저장할 상태
  const [joinedQueues, setJoinedQueues] = useState([]); // 사용자가 참여한 줄서기
  const queueListRef = useRef(null);
  const navigate = useNavigate();

  // 좋아요한 정류장 데이터 불러오기
  useEffect(() => {
    const fetchLikedStops = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("http://localhost:8080/my-stations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 응답 데이터가 배열인지 확인
        const stops = Array.isArray(response.data) ? response.data : [];
        setLikedStops(stops); // 상태에 저장
      } catch (error) {
        console.error("좋아요한 정류장을 불러오는 중 오류 발생:", error);
        setLikedStops([]); // 오류 발생 시 빈 배열로 초기화
      }
    };

    fetchLikedStops();
  }, []);

  // 줄서기 데이터 불러오기
  useEffect(() => {
    const fetchQueueData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("http://localhost:8080/recruit-posts?location=", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 포함
          },
        });

        console.log("Fetched Data:", response.data.data); // 데이터 구조 확인
        setQueueData(response.data.data || []);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
        setQueueData([]); // 오류 시 빈 배열로 설정
      }
    };

    fetchQueueData();
  }, []);

  // 시간 차이를 계산하는 함수
  const formatTimeDifference = (expiresAt) => {
    const now = new Date();
    const expiresTime = new Date(expiresAt);
    const differenceInMilliseconds = expiresTime - now;

    if (differenceInMilliseconds <= 0) {
      return "마감 완료";
    }

    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000);
    const differenceInHours = Math.floor(differenceInMinutes / 60);

    if (differenceInMinutes < 60) {
      return `${differenceInMinutes}분 전`;
    } else {
      return `${differenceInHours}시간 ${differenceInMinutes % 60}분 전`;
    }
  };

  // 줄서기 처리
  const handleJoinQueue = async (recruitPostId) => {
    if (!recruitPostId) {
      console.error("Invalid recruitPostId:", recruitPostId); // 오류 로깅
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      if (joinedQueues.includes(recruitPostId)) {
        // 줄서기 취소 요청
        await axios.delete(`http://localhost:8080/recruit-posts/${recruitPostId}/join`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJoinedQueues(joinedQueues.filter((id) => id !== recruitPostId));
        setQueueData((prevData) =>
          prevData.map((item) =>
            item.recruitPostId === recruitPostId
              ? { ...item, currentMembers: item.currentMembers - 1 }
              : item
          )
        );
      } else {
        // 줄서기 요청
        await axios.post(`http://localhost:8080/recruit-posts/${recruitPostId}/join`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJoinedQueues([...joinedQueues, recruitPostId]);
        setQueueData((prevData) =>
          prevData.map((item) =>
            item.recruitPostId === recruitPostId
              ? { ...item, currentMembers: item.currentMembers + 1 }
              : item
          )
        );
      }
    } catch (error) {
      console.error("줄서기 처리 중 오류 발생:", error);
    }
  };

  // 택시 정류장 좋아요 처리
  const toggleLike = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (likedStops.includes(id)) {
        // 좋아요 취소
        await axios.delete(`http://localhost:8080/my-stations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikedStops(likedStops.filter((stopId) => stopId !== id));
      } else {
        // 좋아요 추가
        await axios.post(
          "http://localhost:8080/my-stations",
          { stationName: id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedStops([...likedStops, id]);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

  // 스크롤 처리
  const handleScroll = () => {
    const element = queueListRef.current;
    if (!element) return;

    const scrollLeft = element.scrollLeft;
    const cardWidth = element.offsetWidth;
    const currentPage = Math.round(scrollLeft / cardWidth);

    setActivePage(currentPage);
  };

  return (
    <div className="home-container">
      <section className="queue-section">
        <div className="section-header" onClick={onClick}>
          <h2>줄서기</h2>
          <FaPlus className="add-icon" onClick={() => navigate("/lineup_plus")} />
        </div>
        <div className="queue-list">
          {queueData && queueData.length > 0 ? (
            queueData.map((item) => (
              <div
                key={item.recruitPostId}
                className={`queue-card ${
                  item.currentMembers >= item.maxMembers ? "completed" : "active"
                }`}
              >
                <div className="status-time">
                  <span
                    className={`status ${
                      item.currentMembers >= item.maxMembers ? "completed" : "active"
                    }`}
                  >
                    {item.currentMembers >= item.maxMembers ? "모집완료" : "모집중"}
                  </span>
                  <p className="date">{formatTimeDifference(item.expiresAt)}</p>
                </div>
                <div className="role-wrapper">
                  <div className="circle"></div>
                  <div className="role-username">
                    <p className="role">{item.title}</p>
                    <p className="username">{item.writerName}</p>
                    <button className="chat-button">채팅하기</button>
                  </div>
                </div>
                <div className="location-wrapper">
                  <p className="label">위치</p>
                  <div className="location-row">
                    <p className="location">{item.location}</p>
                    <FaChevronRight className="chevron-icon" />
                  </div>
                </div>
                <div className="info-group">
                  <div className="members-wrapper">
                    <p className="label">모집인원</p>
                    <div className="icon-count">
                      <IoPersonOutline className="person-icon" />
                      <p className="count">
                        {item.currentMembers}/{item.maxMembers}
                      </p>
                      <button
                        className="line-button"
                        onClick={() => handleJoinQueue(item.recruitPostId)}
                      >
                        {joinedQueues.includes(item.recruitPostId)
                          ? "줄서기 취소"
                          : "줄서기"}
                      </button>
                    </div>
                  </div>
                  <p className="time">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>데이터를 불러오는 중이거나 데이터가 없습니다.</p>
          )}
        </div>

        <div className="pagination">
          {queueData &&
            queueData.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === activePage ? "active" : ""}`}
              ></span>
            ))}
        </div>
      </section>

      <section className="taxi-section">
        <h2>나의 택시정류장</h2>
        <ul className="taxi-list">
          {likedStops.map((stop) => (
            <li key={stop} className="taxi-item">
              <button className="heart-button" onClick={() => toggleLike(stop)}>
                {likedStops.includes(stop) ? (
                  <FaHeart className="heart-icon liked" />
                ) : (
                  <FaRegHeart className="heart-icon" />
                )}
              </button>
              <span>{stop}</span>
              <button className="view-button">보러가기</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
