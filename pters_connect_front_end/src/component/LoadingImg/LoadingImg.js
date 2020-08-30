import React from 'react';

const LoadingImg = ({size}) => {
    return (
        <svg width={size} height={size} viewBox="0 0 128 128">
            <g>
                <path d="M59.6 0h8v40h-8V0z" fill="#595959"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#dedede" transform="rotate(30 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#dedede" transform="rotate(60 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#dedede" transform="rotate(90 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#dedede" transform="rotate(120 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#cdcdcd" transform="rotate(150 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#bdbdbd" transform="rotate(180 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#acacac" transform="rotate(210 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#9b9b9b" transform="rotate(240 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#8a8a8a" transform="rotate(270 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#7a7a7a" transform="rotate(300 64 64)"/>
                <path d="M59.6 0h8v40h-8V0z" fill="#696969" transform="rotate(330 64 64)"/>
                <animateTransform attributeName="transform" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" calcMode="discrete" dur="720ms" repeatCount="indefinite">
                </animateTransform></g>
        </svg>
    );
};

export default LoadingImg;