import React from 'react';
import Header from '../component/headerbisa.jsx';
import Footer from '../component/footer.jsx';
import Berlangganan from '../component/berlangganan.jsx';
import '../css/header.css';
import '../css/footer.css'
import '../css/berlangganan.css';

const LayananPage = () => {
    return (
        <div className="layanan-page">
            {/* Panggil Header */}
            <Header />


            <section className="layanan">
                <Berlangganan />
            </section>
            
            {/* Panggil Footer */}
            <Footer />
        </div>
    );
};

export default LayananPage;