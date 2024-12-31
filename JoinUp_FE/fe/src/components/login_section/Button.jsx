import React from 'react'

const Button = ({btnTitle}) => {
  return (
    <div id='btn_container'>
        <div id="btn_inner_container">
            <div className="btn_box btn">
                <div id="btn_inner_box">
                    <span>{btnTitle}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Button