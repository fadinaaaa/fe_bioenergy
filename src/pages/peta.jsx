import React from 'react';
import Header from '../component/headerbisa.jsx';
import Footer from '../component/footer.jsx';
import '../css/header.css';
import '../css/footer.css';
import '../css/peta.css';
import Map from '../component/map.jsx';
import JudulMap from '../component/judulmap.jsx';

const PetaPage = () => {
    return (
        <div className="news-page">
            {/* Panggil Header */}
            <Header />

            <div className="map-container"> {/* Tambahkan container di sini */}
                <JudulMap />
                <Map />
            </div>
            
            {/* Panggil Footer */}
            <Footer />
        </div>
    );
};

export default PetaPage;
