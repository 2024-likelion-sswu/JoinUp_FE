import React from 'react'

const LoginInput = ({ inputLabel1, inputLabel2, inputType1, inputType2, placeholder1, placeholder2 }) => {
    return (
        <div id='login_input_container'>
            <div id="login_input_inner_container">
                <div id="login_input_inner_box">
                    <div className="login_input_box">
                        <div className="login_input_title">
                            <span>{inputLabel1}</span>
                        </div>
                        <div className="login_input_area email_auth_area">
                            <input type={inputType1} placeholder={placeholder1} />
                            {inputType1 === "email" && (
                                <div className='email_auth_btn btn'>
                                    <span className='btn'>인증</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="login_input_box">
                        <div className="login_input_title">
                            <span>{inputLabel2}</span>
                        </div>
                        <div className="login_input_area">
                            {placeholder2 ? (
                                <input type={inputType2} placeholder={placeholder2} />
                            ) : (
                                <div className='signup_input_blank'></div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginInput