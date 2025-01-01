import React from 'react'
import Header from '../header_section/Header'
import LoginInput from './LoginInput'
import Button from './Button'

const Signup3 = ({ goToSignupPrevStep, currentSignupStep, totalSignupSteps }) => {
    const progressPercentage = (currentSignupStep / totalSignupSteps) * 100;

    const handlePrev = () => {
        const confirmLeave = window.confirm('입력값이 초기화됩니다. 정말로 돌아가시겠습니까?');
        if (confirmLeave) {
            goToSignupPrevStep();
        }
    };

    return (
        <>
            <Header title={"회원가입"} onClick={handlePrev} />
            <div className="inner_container login_page_container">
                <div className="progress_container">
                    <div className="progress_inner_container">
                        <div className="progress_bar" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div className="signup_title_container">
                    <div className="signup_title_box">
                        <span>아이디와 비밀번호를</span>
                        <span>입력해주세요</span>
                    </div>
                </div>
                <LoginInput inputLabel1={"이름"} inputLabel2={"생년월일"} inputType1={"text"} inputType2={"text"} placeholder1={"이름을 입력해주세요"} placeholder2={"생년월일 8자를 입력해주세요"} />
                <Button btnTitle={"회원가입"} currentSignupStep={currentSignupStep} />
            </div>
        </>
    )
}

export default Signup3