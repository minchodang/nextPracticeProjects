import React from 'react';
import styled from 'styled-components';

interface ErrorAlertProps {
    children: React.ReactNode;
}

const Alert = styled.div`
    margin: 1rem auto;
    padding: 1rem 2rem;
    width: 90%;
    max-width: 40rem;
    background-color: #d5bdfc;
    color: #38028d;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 6px;
`;

function ErrorAlert({ children }: ErrorAlertProps) {
    return <Alert>{children}</Alert>;
}

export default ErrorAlert;
