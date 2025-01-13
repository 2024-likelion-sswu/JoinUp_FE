import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GroupImg from '../../assets/images/GroupImg.svg'
import UserIcon from '../../assets/images/UserIcon.png'

const Community_Post = () => {
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
        
            <div className='Post'>
                <div className='PostProfileBox'>
                    <div className='PostProfile'>
                        <div className='PostProfileImg'><img src={UserIcon}></img></div>
                        <div className='PostProfileLable'>
                            <div className='PostProfileName'>택시운전사</div>
                            <div className='PostProfileEng'>taxi_driver</div>
                        </div>
                    </div>
                    <div className='PostMin'>3분전</div>
                </div>
                <div className='PostPart2'>
                    <div className='PostLocationBox'>
                        <div className='PostLocationLable'>위치</div>
                        <div className='PostLocation'>왕십리역 9번 출구</div>
                    </div>
                    <div className='PostRecruitBox'>
                        <div className='PostRecruitLable'>모집인원</div>
                        <div className='PostRecruitBox2'>
                            <img className='PostRecruitBoxImg' src={GroupImg} alt="Group" />
                            <p className='PostRecruitBoxText'>1/5</p>
                        </div>
                    </div>
                    <button className='PostRecruitBoxButton'>채팅하기</button>
                </div>
            </div>
    </div>
  );
}

export default Community_Post;
