import React, { useState } from 'react'
import LoginInput from './LoginInput'
import Button from './Button'
import Header from '../header_section/Header';

const Signup1 = ({ goToSignupNextStep, currentSignupStep, totalSignupSteps }) => {
    const [email, setEmail] = useState('');
    const progressPercentage = (currentSignupStep / totalSignupSteps) * 100;

    const handleNext = () => {
        // if (emailAuthSuccess) {
        //     goToSignupNextStep({ email });
        // }
        goToSignupNextStep({ email });
    };

    return (
        <>
            <Header title={"회원가입"} />
            <div className="inner_container login_page_container">
                <div className="progress_container">
                    <div className="progress_inner_container">
                        <div className="progress_bar" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
                <div className="signup_title_container">
                    <div className="signup_title_box">
                        <span>학교 이메일을</span>
                        <span>인증해주세요</span>
                    </div>
                </div>
                <LoginInput inputType1={"email"} placeholder1={"학교 이메일을 입력해주세요"} />
                <Button btnTitle={"다음"} onClick={handleNext} />
            </div>
        </>
    )
}

export default Signup1