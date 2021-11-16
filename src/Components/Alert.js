import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap';
import AlertContext from '../Context/alert/AlertContext';

const AlertReact = () => {
    const context = useContext(AlertContext);
    const { message, type } = context;
    return (
        <Alert variant={type}>
            {message}
        </Alert>
    )
}

export default AlertReact
