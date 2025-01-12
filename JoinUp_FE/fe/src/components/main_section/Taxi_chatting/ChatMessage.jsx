import React from 'react'

const ChatMessage = ({ text, sender, chatInfo }) => {
    return (
        <div className='chat_message_container'>
            <div className={`chat_message_inner_container ${sender === 'me' ? 'my_message_container' : 'other_message_container'}`}>
                {sender === 'other' && (
                    <div className="other_message_profile">
                        {chatInfo ? (
                            <img src={chatInfo.profileImageUrl || "https://s3-alpha-sig.figma.com/img/f403/4338/0c85127f3d52cd1b5f0e9e7ae098f78e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBI2lRaKRRZuPrLP5~ut6doLVVxDQWevhYPJp40MLwB95sVv6R-WspuzjN6TxyRSvS3vMHP42KYwjEz2HA7YIKHixzRYuLlnNJcwb~lB9Bx6JJ2bX3VeAOwEe72tvE1xVw2XUGlRTCPJAeiz770u1p9joI2o318T5jnDWm~Gy1l8jsl63T1gNGo-Yrk5y~9~bUIIK9Rk8vIXVrzoyfmgHohMPrNaeLvnTR0XWLDbsei32SPPHBz-KvvMGwbTn6lfc2hbi6XbQEA1e4qQScqL37SpA7jmeu4J7MeaM90hDscAwCXSYX9XS99MG~kYQSshpE0yiX4Zix51NEZegh5qoA__"} alt="프로필 사진" />
                        ) : (
                            <img src="https://s3-alpha-sig.figma.com/img/f403/4338/0c85127f3d52cd1b5f0e9e7ae098f78e?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cBI2lRaKRRZuPrLP5~ut6doLVVxDQWevhYPJp40MLwB95sVv6R-WspuzjN6TxyRSvS3vMHP42KYwjEz2HA7YIKHixzRYuLlnNJcwb~lB9Bx6JJ2bX3VeAOwEe72tvE1xVw2XUGlRTCPJAeiz770u1p9joI2o318T5jnDWm~Gy1l8jsl63T1gNGo-Yrk5y~9~bUIIK9Rk8vIXVrzoyfmgHohMPrNaeLvnTR0XWLDbsei32SPPHBz-KvvMGwbTn6lfc2hbi6XbQEA1e4qQScqL37SpA7jmeu4J7MeaM90hDscAwCXSYX9XS99MG~kYQSshpE0yiX4Zix51NEZegh5qoA__" alt="프로필 사진" />
                        )}
                    </div>
                )}
                <div className={`chat_message_inner_box ${sender === 'me' ? 'my_message_box' : 'other_message_box'}`}>
                    <div className={`chat_message_inner_area ${sender === 'me' ? 'my_message_area' : 'other_message_area'}`}>
                        <div className={`chat_message_text_box ${sender === 'me' ? 'my_message' : 'other_message'}`}>
                            <span>{text}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage