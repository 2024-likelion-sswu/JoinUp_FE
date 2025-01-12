import React from 'react'
import { Link } from 'react-router-dom'

const ChatList = ({ chatListItem, onClick, currentUserEmail }) => {
    return (
        <div className='chat_list_container' onClick={onClick}>
            <div className="chat_list_inner_container">
                <div className="chat_list_inner_area">
                    <div className="chat_list_profile_box">
                        {chatListItem ? (
                            <img
                                src={
                                    chatListItem.chatUser.email === currentUserEmail
                                        ? chatListItem.chatPartner.profileImageUrl || "https://s3-alpha-sig.figma.com/img/f403/4338/0c85127f3d52cd1b5f0e9e7ae098f78e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBI2lRaKRRZuPrLP5~ut6doLVVxDQWevhYPJp40MLwB95sVv6R-WspuzjN6TxyRSvS3vMHP42KYwjEz2HA7YIKHixzRYuLlnNJcwb~lB9Bx6JJ2bX3VeAOwEe72tvE1xVw2XUGlRTCPJAeiz770u1p9joI2o318T5jnDWm~Gy1l8jsl63T1gNGo-Yrk5y~9~bUIIK9Rk8vIXVrzoyfmgHohMPrNaeLvnTR0XWLDbsei32SPPHBz-KvvMGwbTn6lfc2hbi6XbQEA1e4qQScqL37SpA7jmeu4J7MeaM90hDscAwCXSYX9XS99MG~kYQSshpE0yiX4Zix51NEZegh5qoA__"
                                        : chatListItem.chatUser.profileImageUrl || "https://s3-alpha-sig.figma.com/img/f403/4338/0c85127f3d52cd1b5f0e9e7ae098f78e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBI2lRaKRRZuPrLP5~ut6doLVVxDQWevhYPJp40MLwB95sVv6R-WspuzjN6TxyRSvS3vMHP42KYwjEz2HA7YIKHixzRYuLlnNJcwb~lB9Bx6JJ2bX3VeAOwEe72tvE1xVw2XUGlRTCPJAeiz770u1p9joI2o318T5jnDWm~Gy1l8jsl63T1gNGo-Yrk5y~9~bUIIK9Rk8vIXVrzoyfmgHohMPrNaeLvnTR0XWLDbsei32SPPHBz-KvvMGwbTn6lfc2hbi6XbQEA1e4qQScqL37SpA7jmeu4J7MeaM90hDscAwCXSYX9XS99MG~kYQSshpE0yiX4Zix51NEZegh5qoA__"
                                }
                                alt="프로필 사진"
                                style={{ cursor: 'default' }}
                            />
                        ) : (
                            <img src="https://s3-alpha-sig.figma.com/img/f403/4338/0c85127f3d52cd1b5f0e9e7ae098f78e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBI2lRaKRRZuPrLP5~ut6doLVVxDQWevhYPJp40MLwB95sVv6R-WspuzjN6TxyRSvS3vMHP42KYwjEz2HA7YIKHixzRYuLlnNJcwb~lB9Bx6JJ2bX3VeAOwEe72tvE1xVw2XUGlRTCPJAeiz770u1p9joI2o318T5jnDWm~Gy1l8jsl63T1gNGo-Yrk5y~9~bUIIK9Rk8vIXVrzoyfmgHohMPrNaeLvnTR0XWLDbsei32SPPHBz-KvvMGwbTn6lfc2hbi6XbQEA1e4qQScqL37SpA7jmeu4J7MeaM90hDscAwCXSYX9XS99MG~kYQSshpE0yiX4Zix51NEZegh5qoA__" alt="프로필 사진" style={{ cursor: 'default' }} />
                        )}
                    </div>
                    <div className="chat_list_content_box btn">
                        {chatListItem ? (
                            <span className="chat_list_content_nickname btn">
                                {chatListItem.chatUser.email === currentUserEmail
                                    ? chatListItem.chatPartner.name
                                    : chatListItem.chatUser.name}
                            </span>
                        ) : (
                            <span className="chat_list_content_nickname btn">데이터를 불러오는 중...</span>
                        )}
                        <span className="chat_list_content_message btn">{chatListItem.lastMessage.slice(0, 19) + (chatListItem.lastMessage.length > 20 ? '...' : '')}</span>
                    </div>
                </div>
                <div className="chat_list_date_box">
                    <span>{new Date(chatListItem.timestamp?.toDate()).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatList