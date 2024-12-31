import React from 'react'
import Header from '../../components/header_section/Header'
import LoginInput from '../../components/login_section/LoginInput'
import Button from '../../components/login_section/Button'

const LoginPage = () => {
    return (
        <div className='container'>
            <Header title={"로그인"} />
            <div className="inner_container login_page_container">
                <LoginInput inputLabel1={"아이디"} inputLabel2={"비밀번호"} inputType1={"text"} inputType2={"password"} placeholder1={"아이디를 입력해주세요"} placeholder2={"비밀번호를 입력해주세요"} />
                <Button btnTitle={"로그인"} />
            </div>
        </div>
    )
}

export default LoginPage