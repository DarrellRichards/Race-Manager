import React from 'react';

const ErrorHandler = (props) => {
    const { error } = props;
    if (error) {
        return <div className="errorMessage"> {error} </div>
    } else {
        return null;
    }
} 

export default ErrorHandler;