import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LandingLogo from '../../assets/images/Logo/JoinUp_Full_Logo.png'

const LandingPage = () => {
    const navigate = useNavigate();
    const text = "잠시만 기다려주세요";

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = localStorage.getItem('authToken');
            if (token) {
                navigate("/home");
            } else {
                navigate("/login");
            }
        }, 4000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div id='landing_container'>
            <div id="landing_inner_container">
                <div id="landing_inner_content_container">
                    <div id="landing_inner_logo_box">
                        <img src={LandingLogo} alt={LandingLogo} />
                    </div>
                    <div id="landing_inner_text_box">
                        {text.split("").map((char, index) => (
                            <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                                {char}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage