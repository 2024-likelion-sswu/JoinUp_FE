import React, { useState } from 'react'
import axios from 'axios'
import '../../assets/scss/section/MyPage/myedit.scss'
import UserIcon from '../../assets/images/UserIcon.png'
import Pencil from '../../assets/images/Pencill.svg'
import { useNavigate } from 'react-router-dom'

const MyEdit = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [birth, setBirth] = useState('');

    const handleMoveMyPage = () => {
        navigate('/mypage')
    }

    const handleUpdateUserInfo = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const formData = new FormData();
            formData.append('name', name); // name 추가
            formData.append('dateOfBirth', birth);

            const response = await axios.put(
                `http://localhost:8080/user/profile`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate('/mypage');
            alert(response.data.message);
        } catch (error) {
            console.error("Failed to update user info:", error);
            alert("수정 실패");
        }
    };

    return (
        <div className='container'>
            <div className='MyEditContainer'>
                <div className='MyEdTitle'>
                    <div className='MyEdDelete' onClick={() => handleMoveMyPage()}>취소</div>
                    <div className='MyEdTitle1'>내 정보 수정하기</div>
                </div>
                <div className='MyEdImgBox'>
                    <img className='MyEdImg' src={UserIcon}></img>
                    <div className='MyEdImgBtn'><img src={Pencil}></img></div>
                </div>
                <div className="MyEdNameBox">
                    <div className="MyEdName1">이름</div>
                    <input
                        className="MyEdName2"
                        value={name} // 상태값을 input의 value로 설정
                        onChange={(e) => setName(e.target.value)} // 입력값을 상태에 반영
                        placeholder="이름을 입력하세요"
                    />
                </div>

                <div className="MyEdBirthBox">
                    <div className="MyEdBirth1">생년월일</div>
                    <input
                        className="MyEdBirth2"
                        value={birth} // 상태값을 input의 value로 설정
                        onChange={(e) => setBirth(e.target.value)} // 입력값을 상태에 반영
                        placeholder="생년월일 8자를 입력하세요"
                    />
                </div>
                <div className='MyEdBtn' onClick={() => handleUpdateUserInfo()}>수정</div>
            </div>
        </div>

    )
}

export default MyEdit
