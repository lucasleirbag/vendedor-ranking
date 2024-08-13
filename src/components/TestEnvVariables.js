// src/components/TestEnvVariables.js
import React from 'react';

const TestEnvVariables = () => (
    <div>
        <p>REACT_APP_ADMIN_USERNAME: {process.env.REACT_APP_ADMIN_USERNAME}</p>
        <p>REACT_APP_ADMIN_PASSWORD: {process.env.REACT_APP_ADMIN_PASSWORD}</p>
    </div>
);

export default TestEnvVariables;
