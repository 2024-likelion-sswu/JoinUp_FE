import React, { useState } from 'react'
import Header from '../../components/header_section/Header'
import LoginInput from '../../components/login_section/LoginInput'
import Button from '../../components/login_section/Button'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLoginSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/auth/login', {
                email: loginEmail,
                password: loginPassword,
            })
            if (response.data.success) {
                const token = response.data.data.token;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userEmail', loginEmail);
                alert(response.data.message);
                navigate('/');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("로그인 실패")
        }
    }

    return (
        <div className='container'>
            <Header title={"로그인"} />
            <div className="inner_container login_page_container">
                <LoginInput
                    inputLabel1={"이메일"}
                    inputLabel2={"비밀번호"}
                    inputType1={"email"}
                    inputType2={"password"}
                    placeholder1={"이메일을 입력해주세요"}
                    placeholder2={"비밀번호를 입력해주세요"}
                    onChange1={e => setLoginEmail(e.target.value)}
                    onChange2={e => setLoginPassword(e.target.value)}
                />
                <Button btnTitle={"로그인"} onClick={handleLoginSubmit} />
                <div className="login_to_signup">
                    <Link to={'/signup'}>
                        <span className='btn'>회원가입</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage