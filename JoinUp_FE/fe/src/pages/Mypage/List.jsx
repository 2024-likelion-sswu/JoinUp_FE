import React from 'react'
import "../../assets/scss/section/MyPage/list.scss";
import { Link } from 'react-router-dom'

const List = () => {
    return (
        <div className='container'>
            <div className="list-container">
                <div className="list-header">
                        <Link className="back-icon" to='/mypage'>
                            &lt; {/* '<' 아이콘 */}
                        </Link>
                    <span>결제내역</span>
                </div>
                <div className="list-list">
                    <div className="list-item">
                        <div className="amount-and-payment">
                            <span className="amount">5500원</span>
                            <span className="payment">결제</span>
                        </div>
                        <span className="detail">에비씨abc님외 4명과 동대문역사문화공원역 1번출구~성신여대입구역까지 22,000원 더치페이 </span>
                    </div>
                    <div className="list-item">
                        <div className="amount-and-payment">
                            <span className="amount">6000원</span>
                            <span className="payment">결제</span>
                        </div>
                        <span className="detail">안녕님외 4명과 왕십리역 7번출구~성신여대입구역까지 24,000원 더치페이 </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default List
