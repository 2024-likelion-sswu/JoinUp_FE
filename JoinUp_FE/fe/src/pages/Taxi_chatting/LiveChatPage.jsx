import React, { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, getDocs } from "firebase/firestore";
import { db } from "../../assets/JS/Firebase";
import ChatMessage from '../../components/main_section/Taxi_chatting/ChatMessage'
import Header from '../../components/header_section/Header'
import { useNavigate, useParams } from 'react-router-dom';

const LiveChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [chatUserInfo, setChatUserInfo] = useState(null);
    const [chatPartnerInfo, setChatPartnerInfo] = useState(null);

    const currentUserEmail = localStorage.getItem('userEmail');
    const { chatRoomId } = useParams();

    const chatCollection = collection(db, "chats");

    useEffect(() => {
        const q = query(chatCollection, orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const filteredData = allData.filter((data) => data.roomId === chatRoomId);
            setMessages(filteredData);
        });

        return () => unsubscribe();
    }, [chatRoomId]);

    useEffect(() => {
        const fetchChatRoomData = async () => {
            try {
                const chatRoomsCollection = collection(db, "chatRooms");
    
                const unsubscribe = onSnapshot(chatRoomsCollection, (snapshot) => {
                    const allRooms = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
    
                    const matchingRoom = allRooms.find((room) => room.roomId === chatRoomId);
    
                    if (matchingRoom) {
                        setChatUserInfo(matchingRoom.chatUser);
                        setChatPartnerInfo(matchingRoom.chatPartner);
                    } else {
                        console.error("해당 채팅방 정보를 찾을 수 없습니다.");
                    }
                });
    
                return () => unsubscribe();
            } catch (error) {
                console.error("채팅방 정보 가져오기 실패:", error);
            }
        };
    
        fetchChatRoomData();
    }, [chatRoomId]);

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        const messageData = {
            sender: currentUserEmail,
            text: newMessage,
            timestamp: new Date(),
            roomId: chatRoomId,
        };

        try {
            const docRef = await addDoc(chatCollection, messageData);

            const chatRoomRef = doc(db, "chatRooms", chatRoomId);
            await updateDoc(chatRoomRef, {
                lastMessage: newMessage,
                timestamp: messageData.timestamp,
            });

            setNewMessage("");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
        }
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/livechat');
    };

    return (
        <div className='container'>
            <Header title={"채팅"} onClick={handleBack} />
            <div id="chat_notice_container">
                <div id="chat_notice_inner_container">
                    <div id="chat_notice_icon_box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none" className='chat_notice_icon'>
                            <path d="M11.3511 1.08051L5.60048 5.68099H1V12.5817H5.60048L11.3511 17.1822V1.08051Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M20.6327 1C22.7888 3.15679 24.0001 6.08165 24.0001 9.13135C24.0001 12.1811 22.7888 15.1059 20.6327 17.2627M16.5728 5.05993C17.6508 6.13832 18.2565 7.60075 18.2565 9.1256C18.2565 10.6505 17.6508 12.1129 16.5728 13.1913" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div id="chat_notice_text_box">
                        <span>
                            {chatUserInfo && chatPartnerInfo ? (
                                <span>
                                    {chatUserInfo.email === currentUserEmail
                                        ? chatPartnerInfo.name
                                        : chatUserInfo.name}
                                    님과의 채팅창입니다.
                                </span>
                            ) : (
                                <span>데이터를 불러오는 중...</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <div className="chat_inner_container">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        text={message.text}
                        sender={message.sender === currentUserEmail ? 'me' : 'other'}
                        chatInfo={
                            chatUserInfo && chatPartnerInfo
                                ? chatUserInfo.email === currentUserEmail
                                    ? chatPartnerInfo
                                    : chatUserInfo
                                : null
                        }
                    />
                ))}
            </div>
            <div id="chat_input_container">
                <div id="chat_input_inner_container">
                    <div id="chat_input_inner_box">
                        <input type="text" placeholder='내용을 입력해주세요.'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />
                        <div id="chat_input_icon_box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className='chat_input_icon btn' onClick={sendMessage}>
                                <path d="M1 10L20 1L11 20L9 12L1 10Z" stroke="#7B7B7E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveChatPage