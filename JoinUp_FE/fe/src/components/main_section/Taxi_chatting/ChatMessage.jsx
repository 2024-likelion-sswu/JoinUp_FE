import React from 'react'

const ChatMessage = ({ text, sender }) => {
    return (
        <div className='chat_message_container'>
            <div className={`chat_message_inner_container ${sender === 'me' ? 'my_message_container' : 'other_message_container'}`}>
                {sender === 'other' && (
                    <div className="other_message_profile">
                        <img src="https://s3-alpha-sig.figma.com/img/e3a4/7dab/c01d37fb5ee2fab1edaeda68af89c73c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JVZf1gqASUhin5KnX~DedLki6y6V4kan0ixRuR2RUlpVgJ7zO3WQTkahjXZpzT~I0IQ7KuVH1fZ61~1ZFHSArPiL8tRCg~SaygIyn~d5uV1Dazd1dMzYCkYPfDfRGKH6srfDJHzl8t5HrsyoQLjd0lZi1qipIClv~6bkNCzP~2hIsup1esmZgo27VgqcxCpnqqrbgHTCI68wcWnqbvJxSYHLynvts8qB1qSMfhsCuJbg1Xml9r4OF9jIYVELj2nQt5YOW25C67Hm7NQKns7bGxqzuo5ynKbw1pBvcVgUrM2vGWFBzPYaZJfoZ2~Wi9hD6elJjkGjPM88NXHXtGSxkw__" alt="프로필 사진" />
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