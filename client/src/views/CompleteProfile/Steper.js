import { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import { ColorlibConnector, ColorlibStepIcon } from "./Steper.Style";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FirstStep from "./Steps/FirstStep";
import SecondStep from "./Steps/SecondStep";
import ThirdStep from "./Steps/ThirdStep";
import { useSelector } from "react-redux";

function getSteps() {
    return ["Complete Personnel Info", "Upload Photos", "Localisation"];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <FirstStep />;
        case 1:
            return <SecondStep />;
        case 2:
            return <ThirdStep />;
        default:
            return "Unknown step";
    }
}

const validateFirstStep = (state) => {
    const {
        firstName,
        lastName,
        birthdate,
        gender,
        sexualPreferences,
        biography,
        tags,
    } = state;
    console.log(
        firstName,
        lastName,
        birthdate,
        gender,
        sexualPreferences,
        biography,
        tags
    );
    if (firstName && lastName) return 1;
    return 0;
};
const validateSecondStep = (state) => {
    const { gallery } = state;
    if (gallery.length === 5) return 1;
    return 0;
};

const Steper = () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const state = useSelector((state) => state.completeProfile);

    console.log(state);
    const handleNext = () => {
        if (activeStep === 1 && validateSecondStep(state)) {
            setActiveStep(activeStep + 1);
        } else if (activeStep === 0 && validateFirstStep(state))
            setActiveStep(activeStep + 1);
        else if (activeStep === 2) {
            console.log("submit data");
        } else console.log("woow");
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <div className="steper">
            <Stepper
                className="steper--steps"
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="steper--step">
                <div className="steper--step__content">
                    {getStepContent(activeStep)}
                </div>
                <div className="steper--step__buttons">
                    <Button
                        className="steper--step__button steper--step__button--back"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button
                        className="steper--step__button steper--step__button--next"
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Steper;
