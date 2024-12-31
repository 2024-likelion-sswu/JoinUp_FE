import React from 'react'

const Button = ({ btnTitle, onClick, currentSignupStep }) => {
    return (
        <div id='btn_container' style={currentSignupStep === 2 || currentSignupStep === 3 ? {marginTop: "211px"} : {marginTop: "300px"}}>
            <div id="btn_inner_container">
                <div className="btn_box btn" onClick={onClick}>
                    <div id="btn_inner_box">
                        <span>{btnTitle}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Button