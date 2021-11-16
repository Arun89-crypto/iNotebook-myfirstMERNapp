import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertState = (props) => {

    const [alert, showAlert] = useState(false);
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const handleAlert = (message, type) => {
        showAlert(true);
        setMessage(message)
        setType(type)
        setTimeout(() => {
            showAlert(false)
            setMessage('')
            setType('')
        }, 2000)
    }
    return (
        <AlertContext.Provider value={{ alert, handleAlert, message, type }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState