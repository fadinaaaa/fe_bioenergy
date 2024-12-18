import React from 'react';

const NewsCard = ({ image, title, description, link }) => {
    return (
        <div className="news-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <button className="btn-read-more">Baca Selengkapnya</button>
                </a>
            ) : (
                <button className="btn-read-more" disabled>
                    Baca Selengkapnya
                </button>
            )}
        </div>
    );
};

export default NewsCard;
