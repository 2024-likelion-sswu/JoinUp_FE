import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/section/Lineup/home.scss";
import { FaBell, FaHeart, FaRegHeart, FaChevronRight, FaPlus } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";

const Home = ({ onClick }) => {
    const [likedStops, setLikedStops] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [queueData, setQueueData] = useState([]); // 모집 글 데이터를 저장할 state
    const queueListRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 백엔드 API 호출
        const fetchQueueData = async () => {
            try {
                const token = localStorage.getItem("authToken");


                const response = await axios.get("http://localhost:8080/recruit-posts?location=", {
                    headers: {
                        Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
                    },
                });
                setQueueData(response.data.data); // 데이터 저장
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchQueueData();
    }, []);

    const formatTimeDifference = (expiresAt) => {
        const now = new Date();
        const expiresTime = new Date(expiresAt);
        const differenceInMilliseconds = expiresTime - now;

        if (differenceInMilliseconds <= 0) {
            return "마감 완료"; // 시간이 지난 경우
        }

        const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000); // 밀리초를 분으로 변환
        const differenceInHours = Math.floor(differenceInMinutes / 60);

        if (differenceInMinutes < 60) {
            return ` ${differenceInMinutes}분 전`;
        } else {
            return ` ${differenceInHours}시간 ${differenceInMinutes % 60}분 전`;
        }
    };


    const taxiStops = [
        { id: 1, name: "왕십리역" },
        { id: 2, name: "동대문역사문화공원역" },
        { id: 3, name: "성신여대입구역" },
    ];
    const toggleLike = (id) => {
        if (likedStops.includes(id)) {
            setLikedStops(likedStops.filter((stopId) => stopId !== id));
        } else {
            setLikedStops([...likedStops, id]);
        }
    };

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
                    <FaPlus
                        className="add-icon"
                        onClick={() => navigate("/lineup_plus")}
                    />
                </div>
                <div className="queue-list">
                    {queueData.map((item) => (
                        <div
                            key={item.recruitPostId}
                            className={`queue-card ${item.currentMembers >= item.maxMembers ? "completed" : "active"
                                }`}
                        >
                            <div className="status-time">
                                <span
                                    className={`status ${item.currentMembers >= item.maxMembers
                                        ? "completed"
                                        : "active"
                                        }`}
                                >
                                    {item.currentMembers >= item.maxMembers ? "모집완료" : "모집중"}
                                </span>
                                <p className="date">
                                    {formatTimeDifference(item.expiresAt)}
                                </p>
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
                                        <button className="line-button">줄서기</button>
                                    </div>
                                </div>
                                <p className="time">{new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {queueData.map((_, index) => (
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
                    {taxiStops.map((stop) => (
                        <li key={stop.id} className="taxi-item">
                            <button className="heart-button" onClick={() => toggleLike(stop.id)}>
                                {likedStops.includes(stop.id) ? (
                                    <FaHeart className="heart-icon liked" />
                                ) : (
                                    <FaRegHeart className="heart-icon" />
                                )}
                            </button>
                            <span>{stop.name}</span>
                            <button className="view-button">보러가기</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
