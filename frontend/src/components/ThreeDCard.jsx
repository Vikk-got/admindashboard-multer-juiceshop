import React from 'react';
import './ThreeDCard.css';

const ThreeDCard = ({ children, className = '', style = {}, ...rest }) => {
    return (
        <div className={`three-d-card ${className}`} style={style} {...rest}>
            <div className="depth-layer depth-back" aria-hidden></div>
            <div className="depth-layer depth-middle" aria-hidden></div>
            <div className="depth-layer depth-front" aria-hidden></div>
            <div className="three-d-content">{children}</div>
        </div>
    );
};

export default ThreeDCard;
