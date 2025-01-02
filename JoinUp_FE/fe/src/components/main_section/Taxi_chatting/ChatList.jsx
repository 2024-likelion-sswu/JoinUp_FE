import React from 'react'
import { Link } from 'react-router-dom'

const ChatList = ({ chatListItem }) => {
    return (
        <div className='chat_list_container'>
            <Link to={'/livechat/id'}>
                <div className="chat_list_inner_container">
                    <div className="chat_list_inner_area">
                        <div className="chat_list_profile_box">
                            <img src={chatListItem.img} alt="" style={{cursor: 'default'}} />
                        </div>
                        <div className="chat_list_content_box btn">
                            <span className="chat_list_content_nickname btn">{chatListItem.nickname}</span>
                            <span className="chat_list_content_message btn">{chatListItem.message.slice(0, 19) + (chatListItem.message.length > 20 ? '...' : '')}</span>
                        </div>
                    </div>
                    <div className="chat_list_date_box">
                        <span>{chatListItem.date}</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ChatList