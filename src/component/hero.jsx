import React from 'react';
import image from '../assset/3.png';

const Hero = () => {
    return (
    <section className="hero">
        <div className="hero-content">
        <h1 className="hero-title">Sustainable Energy</h1>
        <h1 className="hero-title">Sustainable Future</h1>
        <p className="hero-description">
            Energi terbarukan untuk masa depan yang lebih baik, penggunaan sumber daya terbarukan demi lingkungan yang lebih sehat dan ekonomi yang tangguh.
        </p>
        </div>
        <div className="hero-image">
        <img src={image} alt="" />
        </div>
    </section>
    );
};

export default Hero;
