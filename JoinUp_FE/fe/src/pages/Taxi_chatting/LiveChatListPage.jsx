import React from 'react'
import Header from '../../components/header_section/Header'
import ChatList from '../../components/main_section/Taxi_chatting/ChatList'

const LiveChatListPage = () => {
    const chatListItems = [
        {img: 'https://s3-alpha-sig.figma.com/img/e3a4/7dab/c01d37fb5ee2fab1edaeda68af89c73c?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JVZf1gqASUhin5KnX~DedLki6y6V4kan0ixRuR2RUlpVgJ7zO3WQTkahjXZpzT~I0IQ7KuVH1fZ61~1ZFHSArPiL8tRCg~SaygIyn~d5uV1Dazd1dMzYCkYPfDfRGKH6srfDJHzl8t5HrsyoQLjd0lZi1qipIClv~6bkNCzP~2hIsup1esmZgo27VgqcxCpnqqrbgHTCI68wcWnqbvJxSYHLynvts8qB1qSMfhsCuJbg1Xml9r4OF9jIYVELj2nQt5YOW25C67Hm7NQKns7bGxqzuo5ynKbw1pBvcVgUrM2vGWFBzPYaZJfoZ2~Wi9hD6elJjkGjPM88NXHXtGSxkw__', nickname: '에비씨abc', message: '감사합니다! 그럼 5분 후에 뵈어요 금방 가도록 하겠습니다~~', date: '24.12.23'},
        {img: 'https://s3-alpha-sig.figma.com/img/8e39/b494/814739caa4a9e1a02b74abfcd633b757?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MdUSGU479XV3dyyy~9hFaABNSK7GuzNm580nT5fhm3UZ0SM5nPsAaq970gra494gjV1npYh9nNqSfb~MKDxlcmvpnWBVerS4QkX8uC5JjU9DIc7qShJQmmZvZHe7TPdS5-LZVwPM-S861JfL7eZ-Ud0XvmXb9BabZmnjwThnMIGaLJqcT~IhASaAk95KhRKVbelh0cRj~Dw1fEhCvnya1-sSUUoxkyNXqh6LszagNQnaH5Zv-MY69Y4XXTi8qJDMtSejTRqsdfn-AaaaWtX2o11qBkjE2EYKQ~YCA59zqewMPfshMal3V--T1rim4i3dUWCzelu7seDe4M72Bj2~kg__', nickname: 'ㅎㅅㅎ', message: '그러면 택시 큰거로 부르도록 하겠습니다. 5분 후에 봬요!', date: '24.12.21'},
        {img: 'https://s3-alpha-sig.figma.com/img/4e0b/1157/a066f9eaccc367e7051e84149c1e1f16?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qFw2-7eOSzm6zWGls7CBlUb06hkK3l-TfC0oFuR4XJazx4UqWBOf6b2aCWKo7z8thqziw5tAU0oXP1Wam9Lr2P60Wgc316EsKx-VHfbdB~tKApiav2Gfgh2G27tJYgetByd4k3TMkuMbtVyjNNBNR77fN7MWkJxgQ9KI6X9nu3yKgPRvD9NyknzPCAvSdvURAgsoUn6WqdgXleNlQWflpDq~OS1l1mkyoajHm9~tohjctZ8Ga2E-ilZo4vKg6kaWlu0Xd9S9aqHOrYp1kVOsDA-W9MjEdiVpVW5sXig-0pzWmhNxvgHom8Kh7VsC-yMq5N6x1To2~enGV5i5B4wnHg__', nickname: '돌멩이', message: '네 지금 지하철 사람이 많아서 계속 늦어지는 상황이라 약속 시간을 미룰 수 있을까요?', date: '24.12.17'},
    ]

    return (
        <div className='container'>
            <Header title={"채팅"} />
            <div id="chat_list_pg_title_conatiner">
                <div id="chat_list_pg_title_inner_container">
                    <span>전체 메세지</span>
                </div>
            </div>
            <div className="chat_list_pg_inner_conatiner">
                {chatListItems.map((item)=>(
                    <ChatList chatListItem={item} />
                ))}
            </div>
        </div>
    )
}

export default LiveChatListPage