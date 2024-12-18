import React from 'react';

const LayananCard = ({ image, title, description }) => {
    return (
        <div className="layanan-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="btn-read-more">Hubungi Kami</button>
        </div>
        );
};

export default LayananCard;
