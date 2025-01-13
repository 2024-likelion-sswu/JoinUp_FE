import React from 'react'
import { Link } from 'react-router-dom'
import Account from '../../components/MyPage_section/Account'
import Pay from '../../components/MyPage_section/Pay'
import BackBtn from '../../assets/images/BackBtn.svg'
import '../../assets/scss/section/MyPage/mypage.scss'

const MyPage = () => {
  return (
    <div className='container'>
        <div className='MyPageContainer'>
            <div className='MypageHd'>
                <img src={BackBtn} className='BackBtnImg'></img>
                <div className='MyPageTitle'>마이</div>
            </div>
            <div className='Line'></div>
            <Account />
            <div className='Line'></div>
            <Pay />
            <div className='Line'></div>
                <Link to="/List" className='PayList'>
                    <div>결제내역 보기</div>
                    <img className='PayList1' src={BackBtn}></img>
                </Link>
            <div className='Line'></div>
        </div>
    </div>
    
  )
}

export default MyPage