import React, { Fragment } from "react";

import "./CheckOutSteps.css";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const steps=[
    {
        label: <Typography>Shipping Details</Typography>,
        icon: <LocalShippingIcon />,
      },
      {
        label: <Typography>Confirm Order</Typography>,
        icon: <LibraryAddCheckIcon />,
      },
      {
        label: <Typography>Payment</Typography>,
        icon: <AccountBalanceIcon />,
      },

];


const stepsStyles={
    boxSizing:"border-box",
};

const CheckOutSteps = ({activeSteps}) => {
  return (
   <Fragment>
        <Stepper alternativeLabel activeStep={activeSteps} style={stepsStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeSteps === index ? true : false}
            completed={activeSteps>= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeSteps >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}

        </Stepper>
    
   </Fragment>
  )
}

export default CheckOutSteps
