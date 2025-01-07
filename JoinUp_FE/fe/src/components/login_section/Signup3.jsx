import React, { useState } from 'react'
import Header from '../header_section/Header'
import LoginInput from './LoginInput'
import Button from './Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup3 = ({ goToSignupPrevStep, currentSignupStep, totalSignupSteps, signupDataFromPreviousSteps }) => {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const navigate = useNavigate();

    const progressPercentage = (currentSignupStep / totalSignupSteps) * 100;

    const handlePrev = () => {
        const confirmLeave = window.confirm('입력값이 초기화됩니다. 정말로 돌아가시겠습니까?');
        if (confirmLeave) {
            goToSignupPrevStep();
        }
    };

    const handleSignupSubmit = async () => {
        try {
            const signupData = {
                email: signupDataFromPreviousSteps.id,
                password: signupDataFromPreviousSteps.password,
                name,
                dateOfBirth: birthDate,
            };

            const response = await axios.post('http://localhost:8080/user/auth/signup', signupData);
            if (response.data.success) {
                alert(response.data.message);
                navigate("/login");
            } else {
                alert("회원가입 실패");
            }
        } catch (error) {
            alert('회원가입 실패');
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
                <LoginInput
                    inputLabel1={"이름"}
                    inputLabel2={"생년월일"}
                    inputType1={"text"}
                    inputType2={"text"}
                    placeholder1={"이름을 입력해주세요"}
                    placeholder2={"생년월일 8자를 입력해주세요"}
                    onChange1={(e) => setName(e.target.value)}
                    onChange2={(e) => setBirthDate(e.target.value)}
                />
                <Button btnTitle={"회원가입"} currentSignupStep={currentSignupStep} onClick={handleSignupSubmit} />
            </div>
        </>
    )
}

export default Signup3