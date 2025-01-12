import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy, where, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '../../assets/JS/Firebase';
import Header from '../../components/header_section/Header'
import ChatList from '../../components/main_section/Taxi_chatting/ChatList'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LiveChatListPage = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const navigate = useNavigate();
    const currentUserEmail = localStorage.getItem('userEmail');
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if (!currentUserEmail || !authToken) {
            console.error("사용자 이메일 또는 토큰이 없습니다.");
            return;
        }

        const fetchUserProfileAndUpdateChatRooms = async () => {
            try {
                // 사용자 프로필 가져오기
                const response = await axios.get('http://localhost:8080/user/profile', {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (response.data.success) {
                    const { email, name, profileImageUrl } = response.data.data;

                    // Firestore에서 사용자가 포함된 채팅방 가져오기
                    const chatRoomsCollection = collection(db, "chatRooms");
                    const q = query(
                        chatRoomsCollection,
                        where("participants", "array-contains", currentUserEmail)
                    );
                    const snapshot = await getDocs(q);

                    const updates = [];
                    snapshot.docs.forEach((docSnapshot) => {
                        const chatRoomData = docSnapshot.data();
                        const chatRoomRef = doc(db, "chatRooms", docSnapshot.id);

                        // 현재 사용자 정보 업데이트가 필요한지 확인
                        if (
                            chatRoomData.chatUser?.email === currentUserEmail &&
                            (chatRoomData.chatUser.name !== name ||
                                chatRoomData.chatUser.profileImageUrl !== profileImageUrl)
                        ) {
                            updates.push(
                                updateDoc(chatRoomRef, {
                                    "chatUser.name": name,
                                    "chatUser.profileImageUrl": profileImageUrl,
                                })
                            );
                        }

                        if (
                            chatRoomData.chatPartner?.email === currentUserEmail &&
                            (chatRoomData.chatPartner.name !== name ||
                                chatRoomData.chatPartner.profileImageUrl !== profileImageUrl)
                        ) {
                            updates.push(
                                updateDoc(chatRoomRef, {
                                    "chatPartner.name": name,
                                    "chatPartner.profileImageUrl": profileImageUrl,
                                })
                            );
                        }
                    });

                    // 모든 업데이트 실행
                    await Promise.all(updates);
                } else {
                    console.error("사용자 프로필을 가져오지 못했습니다:", response.data.message);
                }
            } catch (error) {
                console.error("사용자 프로필 또는 채팅방 정보 업데이트 실패:", error);
            }
        };

        fetchUserProfileAndUpdateChatRooms();
    }, [currentUserEmail, authToken]);

    useEffect(() => {
        if (!currentUserEmail) {
            console.error("사용자 이메일이 없습니다.");
            return;
        }

        // Firestore에서 chatRooms 컬렉션 가져오기
        const chatRoomsCollection = collection(db, "chatRooms");
        const q = query(
            chatRoomsCollection,
            where("participants", "array-contains", currentUserEmail), // 본인이 포함된 채팅방만 필터링
            orderBy("timestamp", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const rooms = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChatRooms(rooms);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [currentUserEmail]);

    const handleRoomClick = (roomId) => {
        navigate(`/livechat/${roomId}`);
    };

    return (
        <div className='container'>
            <Header title={"채팅"} />
            <div id="chat_list_pg_title_conatiner">
                <div id="chat_list_pg_title_inner_container">
                    <span>전체 메세지</span>
                </div>
            </div>
            <div className="chat_list_pg_inner_conatiner">
                {chatRooms.length > 0 ? (
                    chatRooms.map((room) => (
                        <ChatList
                            key={room.id}
                            chatListItem={room}
                            onClick={() => handleRoomClick(room.id)}
                            currentUserEmail={currentUserEmail}
                        />
                    ))
                ) : (
                    <div className="no_chat_message" style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "#7B7B7E"}}>
                        <span>채팅목록이 없습니다.</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveChatListPage