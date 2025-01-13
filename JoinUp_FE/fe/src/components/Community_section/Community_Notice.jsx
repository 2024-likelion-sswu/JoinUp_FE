import React, { useState } from 'react';
import Checking from '../../assets/images/Checking.svg';
import { useNavigate } from 'react-router-dom';

const Community_Notice = () => {
    const navigate = useNavigate();
    const [notices, setNotices] = useState([
        { title: "2호선 게시판", content: 'LINE2' },
        { title: "정보 게시판", content: "INFO" },
        { title: "자유 게시판", content: "FREE" },
        { title: "5호선 게시판", content: "LINE5" },
    ]);

    // 클릭 시 호출되는 함수
    const handleClick = (title, content) => {
        navigate(`/community/post?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}`);
    };

    return (
        <div>
            <div className='NoticeLable'>게시판</div>
            <div className='NoticeWrap'>
                {notices.map((notice, index) => (
                    <div key={index}>
                        <div className='Notice'>
                            <img className='NoticeImg' src={Checking} alt="게시판 아이콘" />
                            <p className='NoticeTitle'>{notice.title}</p>
                            {/* onClick에 title과 content를 함께 전달 */}
                            <button className='NoticeButton' onClick={() => handleClick(notice.title, notice.content)}>바로 가기</button>
                        </div>
                        {index !== notices.length - 1 && <div className='Line'></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community_Notice;
