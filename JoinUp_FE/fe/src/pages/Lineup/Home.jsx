import React, { useState, useRef, useEffect } from "react";
import "../../assets/scss/section/Lineup/home.scss";
import { FaBell, FaHeart, FaRegHeart, FaChevronRight, FaPlus } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";

const Home = ({onClick}) => {
    const [likedStops, setLikedStops] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const queueListRef = useRef(null);

    const mockData = [
        {
            id: 1,
            status: "모집중",
            time: "5분전",
            role: "택시운전사",
            username: "taxi_driver",
            location: "왕십리역 9번 출구",
            members: "3/5",
            tags: "#왕십리역 #택시합승 #2호선 #5호선",
            date: "2024-12-23 9:36",
        },
        {
            id: 2,
            status: "모집완료",
            time: "10분전",
            role: "수정중",
            username: "crystal_lee",
            location: "동대문역사문화공원역",
            members: "4/4",
            tags: "#동대문역사문화공원 #합승",
            date: "2024-12-23 9:36",
        },
    ];

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
                <div className="section-header btn" onClick={onClick}>
                    <h2>줄서기</h2>
                    <FaPlus className="add-icon" />
                </div>
                <div className="queue-list">
                    {mockData.map((item) => (
                        <div
                            key={item.id}
                            className={`queue-card ${item.status === "모집완료" ? "completed" : "active"}`}
                        >
                            <div className="status-time">
                                <span className={`status ${item.status === "모집완료" ? "completed" : "active"}`}>
                                    {item.status}
                                </span>
                                <p className="time">{item.time}</p>
                            </div>
                            <div className="role-wrapper">
                                <div className="circle"></div>
                                <div className="role-username">
                                    <p className="role">{item.role}</p>
                                    <p className="username">{item.username}</p>
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
                                        <p className="count">{item.members}</p>
                                        <button className="line-button">줄서기</button>
                                    </div>
                                </div>
                                <p className="tags">{item.tags}</p>
                                <p className="date">{item.date}</p>

                            </div>

                        </div>
                    ))}
                </div>
                <div className="pagination">
                    {mockData.map((_, index) => (
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
