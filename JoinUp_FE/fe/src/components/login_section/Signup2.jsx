import React, { useState } from 'react'
import Header from '../header_section/Header';
import LoginInput from './LoginInput';
import Button from './Button';

const Signup2 = ({ goToSignupNextStep, goToSignupPrevStep, currentSignupStep, totalSignupSteps }) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const progressPercentage = (currentSignupStep / totalSignupSteps) * 100;

    const handlePrev = () => {
        const confirmLeave = window.confirm('입력값이 초기화됩니다. 정말로 돌아가시겠습니까?');
        if (confirmLeave) {
            goToSignupPrevStep();
        }
    };

    const handleNext = () => {
        goToSignupNextStep({ id, password });
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
                <LoginInput inputLabel1={"이메일"} inputLabel2={"비밀번호"} inputType1={"email"} inputType2={"password"} placeholder1={"아이디를 입력해주세요"} placeholder2={"비밀번호를 입력해주세요"} />
                <Button btnTitle={"다음"} onClick={handleNext} currentSignupStep={currentSignupStep} />
            </div>
        </>
    )
}

export default Signup2