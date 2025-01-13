import React, { useState } from 'react'
import LoginInput from './LoginInput'
import Button from './Button'
import Header from '../header_section/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup1 = ({ goToSignupNextStep, currentSignupStep, totalSignupSteps }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const progressPercentage = (currentSignupStep / totalSignupSteps) * 100;

    const handleEmailAuthClick = async () => {
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/user/auth/verification", { email }, { headers: { "Content-Type": "application/json" } });
            if (response.data.success) {
                alert(response.data.message);
                setSuccess(response.data.success);
            } else {
                alert("이메일 인증에 실패했습니다.");
            }
        } catch (error) {
            alert("서버 요청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleNext = () => {
        // if (!email) {
        //     alert("이메일을 입력해주세요.");
        //     return;
        // }
        // if (!success) {
        //     alert("이메일 인증을 완료해주세요.");
        //     return;
        // }
        goToSignupNextStep({email});
    };

    const handleBackBtn = () => {
        navigate('/login');
    }

    return (
        <>
            <Header title={"회원가입"} onClick={handleBackBtn} />
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
                <LoginInput inputType1={"email"} placeholder1={"학교 이메일을 입력해주세요"} onChange1={(e) => setEmail(e.target.value)} onEmailAuthClick={handleEmailAuthClick} />
                <Button btnTitle={"다음"} onClick={handleNext} />
            </div>
        </>
    )
}

export default Signup1