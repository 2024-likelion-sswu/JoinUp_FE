import React from 'react'

const LoginInput = ({inputLabel1, inputLabel2, inputType1, inputType2, placeholder1, placeholder2}) => {
    return (
        <div id='login_input_container'>
            <div id="login_input_inner_container">
                <div id="login_input_inner_box">
                    <div className="login_input_box">
                        <div className="login_input_title">
                            <span>{inputLabel1}</span>
                        </div>
                        <div className="login_input_area">
                            <input type={inputType1} placeholder={placeholder1} />
                        </div>
                    </div>
                    <div className="login_input_box">
                        <div className="login_input_title">
                            <span>{inputLabel2}</span>
                        </div>
                        <div className="login_input_area">
                            <input type={inputType2} placeholder={placeholder2} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginInput