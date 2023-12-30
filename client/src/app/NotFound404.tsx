import React from 'react';
import Navbar from './components/nav/Navbar';
import './NotFound404.css';

const NotFound404 = () => {
    return (
        <div className="not-found-container">
            <div className="header">
                <p>404</p>
            </div> 
            <div className="content">
                <p>The page you are looking for doesn't exist or has been moved.</p>
            </div>
        </div>
    );
}

export default NotFound404;
