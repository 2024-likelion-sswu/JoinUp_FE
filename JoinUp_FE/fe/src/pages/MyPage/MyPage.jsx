import React from 'react'
import Account from '../../components/MyPage_section/Account'
import Pay from '../../components/MyPage_section/Pay'
import BackBtn from '../../assets/images/BackBtn.svg'
import '../../assets/scss/section/MyPage/mypage.scss'

const MyPage = () => {
  return (
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
        <div className='PayList'>
            <p>결제내역 보기</p>
            <img className='PayList1' src={BackBtn}></img>
        </div>
        <div className='Line'></div>
    </div>
  )
}

export default MyPage