import React from "react";
import "../../assets/scss/section/Mypage/coupon.scss";

const Coupon = () => {
    const handleBack = () => {
        console.log("뒤로가기 버튼 클릭됨");
        // 필요에 따라 뒤로가기 로직 추가 (예: history.goBack() 등)
    };
    return (
        <div className='container'>
            <div className="coupon-container">
                <div className="coupon-header">
                    <span className="back-icon" onClick={handleBack}>
                        &lt; {/* '<' 아이콘 */}
                    </span>
                    <span>쿠폰함</span>
                </div>
                <div className="coupon-list">
                    <div className="coupon-item">
                        <div className="discount-and-description">
                            <span className="discount-rate">10%</span>
                            <span className="description">생일 할인 쿠폰</span>
                        </div>
                        <span className="expiry-date">사용기한 24.12.31 23:59</span>
                    </div>
                    <div className="coupon-item">
                        <div className="discount-and-description">
                            <span className="discount-rate">25%</span>
                            <span className="description">새해 맞이 할인 쿠폰</span>
                        </div>
                        <span className="expiry-date">사용기한 25.01.31 23:59</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coupon;
