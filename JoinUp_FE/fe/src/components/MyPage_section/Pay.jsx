import React from 'react'
import '../../assets/scss/section/MyPage/mypage.scss'
import PayImg from '../../assets/images/PayImg.svg'
import CouponBox from '../../assets/images/CouponBox.svg'
import { Link } from 'react-router-dom'

const Pay = () => {
  return (
    <div className='PayContainer'>
        <div className='TotalPayBox'>
            <div><p>브레드이발소님,</p></div>
            <div><p className='TotalPayText'>총 10,500원</p></div>
            <div><p>결제건이 있습니다!</p></div>
        </div>
        <div className='PointBox'>
            <div className='PointBox1'>포인트</div>
            <div className='PointBox2'>
                <div className='NowPoint'>보유 20,000P</div>
                <button className='ChargeBtn'>충전</button>
            </div>
        </div>
        <div className='PaymentsBox'>
            <div className='KakaoPayBox'>
                <div className='Kakao1'>
                    <div className='KakaoImg'>
                        <div className='KakaoPayImg'>
                            <img className='PayImg' src={PayImg}></img>
                            <div className='Paytxt'>Pay</div>
                        </div>
                        <div className='NowPayMn'>
                            <div className='NowPayMn1'>현재 잔액</div>
                            <div className='NowPayMn2'>56,700원</div>
                        </div>
                    </div>
                </div>
                <div className='Line'></div>
                <div className='Kakao2'>충전하기</div>
            </div>
            
            <Link className='CouponBox' to="/Coupon">
                <div className='CpBox1'>
                    <img className='CpBImg' src={CouponBox}></img>
                </div>
                <div className='Line'></div>
                <div className='CpBox2'>쿠폰함</div>
            </Link>
            
        </div>
    </div>
  )
}

export default Pay
