import React from 'react'
import ChatMessage from '../../components/main_section/Taxi_chatting/ChatMessage'
import Header from '../../components/header_section/Header'
import { useNavigate } from 'react-router-dom';

const LiveChatPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const messageList = [
        { sender: 'me', text: '안녕하세요! 에비씨님 혹시 택시 같이 탈 수 있을까요? 지금 역까지 3분정도 남았어요' },
        { sender: 'other', text: '안녕하세요! 00님 5분 후 뵙는거 괜찮을까요?' },
        { sender: 'me', text: '감사합니다! 그럼 5분 후에 뵈어요 금방 가도록 하겠습니다~~' },
    ]

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
                        <span>에비씨abd님과의 채팅창입니다.</span>
                    </div>
                </div>
            </div>
            <div className="chat_inner_container">
                {messageList.map((item) => (
                    <ChatMessage text={item.text} sender={item.sender} />
                ))}
            </div>
            <div id="chat_input_container">
                <div id="chat_input_inner_container">
                    <div id="chat_input_inner_box">
                        <input type="text" placeholder='내용을 입력해주세요.' />
                        <div id="chat_input_icon_box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none" className='chat_input_icon btn'>
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