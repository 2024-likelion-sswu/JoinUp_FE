import React from 'react'
import '../../assets/scss/section/MyPage/myedit.scss'
import UserIcon from '../../assets/images/UserIcon.png'
import { useNavigate } from 'react-router-dom'

const MyEdit = () => {
    const navigate = useNavigate()

    const handleMoveMyPage = () => {
        navigate('/mypage')
    }
  return (
    <div className='MyEditContainer'>
        <div className='MyEdTitle'>
            <div className='MyEdDelete' onClick={() => handleMoveMyPage()}>취소</div>
            <div className='MyEdTitle1'>내 정보 수정하기</div>
        </div>
        <div className='MyEdImgBox'>
            <img className='MyEdImg' src={UserIcon}></img>
            <div className='MyEdImgBtn'></div>
        </div>
        <div className='MyEdNameBox'>
            <div className='MyEdName1'>이름</div>
            <input className='MyEdName2' placeholder='이름을 입력하세요'></input>
        </div>
        <div className='MyEdBirthBox'>
            <div className='MyEdBirth1'>생년월일</div>
            <input className='MyEdBirth2' placeholder='생년월일 8자를 입력하세요'></input>
        </div>
        <div className='MyEdBtn'>수정</div>
    </div>
  )
}

export default MyEdit
