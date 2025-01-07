import React, { useState } from 'react'
import Signup1 from '../../components/login_section/Signup1'
import Signup2 from '../../components/login_section/Signup2';
import Signup3 from '../../components/login_section/Signup3';

const SignupPage = () => {
    const [currentSignupStep, setCurrentSignupStep] = useState(1);
    const [signupData, setSignupData] = useState({});
    const totalSignupSteps = 3;

    const goToSignupNextStep = (data) => {
        setSignupData((prev) => ({ ...prev, ...data }));
        if (currentSignupStep < totalSignupSteps) {
            setCurrentSignupStep(currentSignupStep + 1);
        }
    };

    const goToSignupPrevStep = () => {
        if (currentSignupStep > 1) {
            setCurrentSignupStep(currentSignupStep - 1);
        }
    };

    return (
        <div className='container'>
            {currentSignupStep === 1 &&
                <Signup1
                    goToSignupNextStep={goToSignupNextStep}
                    currentSignupStep={currentSignupStep}
                    totalSignupSteps={totalSignupSteps}
                />}
            {currentSignupStep === 2 &&
                <Signup2
                    goToSignupNextStep={goToSignupNextStep}
                    goToSignupPrevStep={goToSignupPrevStep}
                    currentSignupStep={currentSignupStep}
                    totalSignupSteps={totalSignupSteps}
                    signupDataFromPreviousSteps={signupData}
                />}
            {currentSignupStep === 3 &&
                <Signup3
                    goToSignupPrevStep={goToSignupPrevStep}
                    currentSignupStep={currentSignupStep}
                    totalSignupSteps={totalSignupSteps}
                    signupDataFromPreviousSteps={signupData}
                />}
        </div>
    )
}

export default SignupPage