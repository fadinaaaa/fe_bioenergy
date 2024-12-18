import React from 'react';
import LayananCard from './layanancard';
import image from '../assset/4.png';
import image1 from '../assset/5.png';
import image2 from '../assset/6.png';

const newsData = [
    {
        image: image2,
        title: 'Konsultasi',
        description: 'Panduan ahli dalam proyek bioenergi biomassa',
    },
    {
        image: image,
        title: 'Pelatihan',
        description: 'Pelatihan teknologi dan pemanfaatan biomassa',
    },
    {
        image: image1,
        title: 'Distribusi',
        description: 'Distribusi produk biomassa energi tepat waktu',
    },
  // Tambahkan lebih banyak data berita di sini
];

const LayananList = () => {
    return (
    <section id="layanan" className="layanan-section">
        <h2>Layanan</h2>
        <div className="layanan-grid">
        {newsData.map((layanan, index) => (
            <LayananCard
                key={index}
                image={layanan.image}
                title={layanan.title}
                description={layanan.description}
            />
        ))}
        </div>
    </section>
    );
};

export default LayananList;
