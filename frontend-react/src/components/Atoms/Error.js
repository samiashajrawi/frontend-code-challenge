import React from 'react';


const Error = ({error}) => {
    return (
        <h1 className="text-danger">{error}</h1>
    );
}

export default Error;