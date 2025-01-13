import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GroupImg from '../../assets/images/GroupImg.svg'
import UserIcon from '../../assets/images/UserIcon.png'
import { collection, addDoc, query, where, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../assets/JS/Firebase";
import { useNavigate } from 'react-router-dom';

const Community_Post = () => {
    const navigate = useNavigate();

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

    const timeAgo = (createdAt) => {
        const currentTime = new Date();
        const postTime = new Date(createdAt);

        const diffInSeconds = Math.floor((currentTime - postTime) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) {
            return '방금 전';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
            return `${diffInHours}시간 전`;
        } else {
            return `${diffInDays}일 전`;
        }
    };

    const [myPost, setMyPost] = useState([]);

    useEffect(() => {
        const fetchPostInfo = async () => {
            try {
                const token = localStorage.getItem('authToken'); 

                const response = await axios.get(`http://localhost:8080/recruit-posts/myjoin`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setMyPost(response.data.data) // 받은 데이터를 상태로 설정
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };
        fetchPostInfo()
    }, []); // 빈 배열을 넣어 useEffect가 컴포넌트가 마운트될 때만 실행되도록 함

  return (
    <div className='PostWrap'>
        {/* myPost가 배열이므로 map을 사용하여 항목을 출력 */}
        {myPost?.map((post, index) => (
            <div className='Post'>
                <div className='PostProfileBox'>
                    <div className='PostProfile'>
                        <div className='PostProfileImg'><img src={UserIcon}></img></div>
                        <div className='PostProfileLable'>
                            <div className='PostProfileName'>{post.title}</div>
                            <div className='PostProfileEng'>{post.writerName}</div>
                        </div>
                    </div>
                    <div className='PostMin'>{timeAgo(post?.createdAt)}</div>
                </div>
                <div className='PostPart2'>
                    <div className='PostLocationBox'>
                        <div className='PostLocationLable'>위치</div>
                        <div className='PostLocation'>{post?.location}</div>
                    </div>
                    <div className='PostRecruitBox'>
                        <div className='PostRecruitLable'>모집인원</div>
                        <div className='PostRecruitBox2'>
                            <img className='PostRecruitBoxImg' src={GroupImg} alt="Group" />
                            <p className='PostRecruitBoxText'>{post?.currentMembers}/{post?.maxMembers}</p>
                        </div>
                    </div>
                    <button className='PostRecruitBoxButton' onClick={() => handleStartChat(post.recruitPostId)}>채팅하기</button>
                </div>
            </div>
            ))}
    </div>
  );
}

export default Community_Post;
