import React, { useState, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import "../../assets/scss/section/Lineup/home.scss";
import { FaChevronRight, FaPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../assets/JS/Firebase";

const Home = ({ onClick }) => {
    const [likedStops, setLikedStops] = useState([]); // 좋아요한 정류장
    const [activePage, setActivePage] = useState(0);
    const [queueData, setQueueData] = useState([]); // 모집 글 데이터
    const [joinedQueues, setJoinedQueues] = useState([]); // 참여한 줄서기
    const queueListRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { stationName } = location.state || {};

    
    const userEmail = localStorage.getItem("userEmail");

    const createOrGetChatRoom = async (userEmail, otherUserEmail, roomId, chatInfo) => {
        try {
            const chatRoomsCollection = collection(db, "chatRooms");

            // 참여자 정보를 기준으로 채팅방이 존재하는지 확인
            const q = query(
                chatRoomsCollection,
                where("participants", "array-contains", userEmail)
            );
            const querySnapshot = await getDocs(q);

            // 기존 채팅방이 있는지 확인
            let existingRoom = null;
            querySnapshot.forEach((doc) => {
                const roomData = doc.data();
                if (roomData.participants.includes(otherUserEmail)) {
                    existingRoom = { id: doc.id, ...roomData };
                }
            });

            if (existingRoom) {
                // 기존 채팅방이 있으면 반환
                console.log("채팅방이 이미 존재합니다:", existingRoom);
                return existingRoom.id;
            } else {
                // 새로운 채팅방 생성
                const newRoom = await addDoc(chatRoomsCollection, {
                    roomId: null,
                    roomName: `${otherUserEmail}`,
                    participants: [userEmail, otherUserEmail],
                    lastMessage: "",
                    timestamp: serverTimestamp(),
                    chatPartner: chatInfo?.chatPartner, // 유저 정보 저장
                    chatUser: chatInfo?.chatUser,
                });

                await updateDoc(newRoom, {
                    roomId: newRoom.id, // 문서 ID를 roomId로 저장
                });
                return newRoom.id;
            }
        } catch (error) {
            console.error("채팅방 생성 오류:", error);
        }
    };

    const handleStartChat = async (roomId) => {
        try {
            // 채팅방 정보 가져오기
            const token = localStorage.getItem("authToken");
            const response = await axios.get(`http://localhost:8080/recruit-posts/${roomId}/chat`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.success) {
                const chatInfo = response.data.data;
                const otherUserEmail = chatInfo?.chatPartner?.email; // 상대방 이메일 추출

                if (!otherUserEmail) {
                    console.error("상대방 이메일을 가져오지 못했습니다.");
                    return;
                }
                const createdRoomId = await createOrGetChatRoom(userEmail, otherUserEmail, roomId, chatInfo);
                if (createdRoomId) {
                    navigate(`/livechat/${createdRoomId}`);
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("채팅방 정보 가져오기 실패:", error);
        }
    };

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

                setLikedStops(response.data.data || []); // 데이터가 없으면 빈 배열
            } catch (error) {
                console.error("좋아요한 정류장을 불러오는 중 오류 발생:", error);
                setLikedStops([]); // 오류 시 빈 배열로 초기화
            }
        };

        fetchLikedStops();
    }, []);

    // 줄서기 데이터 불러오기
    useEffect(() => {
        const fetchQueueData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(
                    "http://localhost:8080/recruit-posts?location=",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setQueueData(response.data.data || []); // 데이터가 없으면 빈 배열
            } catch (error) {
                console.error("데이터를 불러오는 중 오류 발생:", error);
                setQueueData([]);
            }
        };

        fetchQueueData();
    }, []);
    console.log(queueData);

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

        return differenceInMinutes < 60
            ? `${differenceInMinutes}분 전`
            : `${differenceInHours}시간 ${differenceInMinutes % 60}분 전`;
    };

    // 줄서기 처리
    const handleJoinQueue = async (recruitPostId) => {
        const token = localStorage.getItem("authToken");

        try {
            if (joinedQueues.includes(recruitPostId)) {
                // 줄서기 취소
                await axios.delete(
                    `http://localhost:8080/recruit-posts/${recruitPostId}/join`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
                await axios.post(
                    `http://localhost:8080/recruit-posts/${recruitPostId}/join`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
    useEffect(() => {
        const fetchJoinedQueues = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://localhost:8080/recruit-posts/joined", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // 서버에서 현재 사용자가 참여 중인 줄서기 ID 목록 반환
                const joinedQueueIds = response.data.data.map((item) => item.recruitPostId);
                setJoinedQueues(joinedQueueIds); // 상태에 설정
            } catch (error) {
                console.error("참여 중인 줄서기 정보를 가져오는 중 오류 발생:", error);
            }
        };
    
        fetchJoinedQueues();
    }, []);
    // 택시 정류장 좋아요 처리
    const toggleLike = async (station) => {
        const token = localStorage.getItem("authToken");

        try {
            if (likedStops.some((s) => s.id === station.id)) {
                // 좋아요 취소
                await axios.delete(`http://localhost:8080/my-stations/${station.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setLikedStops(likedStops.filter((s) => s.id !== station.id));
            } else {
                // 좋아요 추가
                const response = await axios.post(
                    "http://localhost:8080/my-stations",
                    { stationName: station.stationName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setLikedStops([...likedStops, response.data]);
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
                    {queueData.length > 0 ? (
                        queueData.map((item) => (
                            <div
                                key={item.recruitPostId}
                                className={`queue-card ${item.currentMembers >= item.maxMembers ? "completed" : "active"
                                    }`}
                            >
                                <div className="status-time">
                                    <span
                                        className={`status ${item.currentMembers >= item.maxMembers ? "completed" : "active"
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
                                        <button className="chat-button" onClick={() => handleStartChat(item.recruitPostId)}>채팅하기</button>
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
                        <p>현재 줄서는 곳이 없습니다.</p>
                    )}
                </div>
            </section>

            <section className="taxi-section">
                <h2>나의 택시정류장</h2>
                <ul className="taxi-list">
                    {likedStops.map((station) => (
                        <li key={station.id} className="taxi-item">
                            <button className="heart-button" onClick={() => toggleLike(station)}>
                                {likedStops.some((s) => s.id === station.id) ? (
                                    <FaHeart className="heart-icon liked" />
                                ) : (
                                    <FaRegHeart className="heart-icon" />
                                )}
                            </button>
                            <span>{station.stationName}</span>
                            <button
                                className="go-to-button"
                            >
                                보러가기
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Home;
