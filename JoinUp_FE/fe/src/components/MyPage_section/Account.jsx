import React from 'react'
import UserIcon from '../../assets/images/UserIcon.png'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate();

    const handleMoveEditPage = () => {
        navigate('/myedit')
    }
  return (
    <div className='AccountContainer'>
        <img src={UserIcon}className='UserIcon'></img>
        <div className='UserInfoBox'>
            <div className='UserName'>브레드이발소</div>
            <div className='UserEmail'>20231049@sungshin.ac.kr</div>
            <div className='UserInfoBtn'>
                <button className='UserInfoEditer' onClick={() => handleMoveEditPage()}>회원정보 수정</button>
                <button className='UserInfoLogout'>로그아웃</button>
            </div>
        </div>
    </div>
  )
}

export default Account
