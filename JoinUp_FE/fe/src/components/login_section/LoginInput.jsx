import React from 'react'

const LoginInput = ({ inputLabel1, inputLabel2, inputType1, inputType2, placeholder1, placeholder2, value1, value2, onChange1, onChange2, readOnly, onEmailAuthClick }) => {
    return (
        <div id='login_input_container'>
            <div id="login_input_inner_container">
                <div id="login_input_inner_box">
                    <div className="login_input_box">
                        <div className="login_input_title">
                            <span>{inputLabel1}</span>
                        </div>
                        <div className="login_input_area email_auth_area">
                            <input
                                type={inputType1}
                                placeholder={placeholder1}
                                onChange={onChange1}
                                value={value1}
                                readOnly={readOnly}
                            />
                            {onEmailAuthClick && (
                                <div className='email_auth_btn btn'>
                                    <span className='btn' onClick={onEmailAuthClick}>인증</span>
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
                                <input
                                    type={inputType2}
                                    placeholder={placeholder2}
                                    onChange={onChange2}
                                    value={value2}
                                />
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