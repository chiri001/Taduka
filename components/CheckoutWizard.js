import React from 'react';
import { Step, StepLable, Stepper } from '@mui/material';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {['Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step) => (
          <Step key={step}>
            <StepLable>{step}</StepLable>
          </Step>
        )
      )}
    </Stepper>
  );
}
