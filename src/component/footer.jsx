import React from 'react';
import logo from '../assset/7.png';

const styles = {
    list: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
};

const SiteFooter = () => {
    return (
        <footer>
            <div>
                <div>
                    <h1 className="logo">
                        <img src={logo} alt="Logo" className="logo-image" /> {/* Tambahkan gambar logo */}
                        <span className="logo-bio">Bio</span>
                        <span className="logo-energy">energy</span>
                    </h1>
                </div>

                <div>
                    <h4></h4>
                    <ul>
                        <li><a href="/">Beranda</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/peta">Peta</a></li>
                        <li><a href="/layanan">Layanan</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Sosial Media</h4>
                    <ul style={styles.list}>
                        <li><a href="https://instagram.com">Instagram</a></li>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                    </ul>
                </div>

                <div>
                    <h4>Kontak Kami</h4>
                    <ul style={styles.list}>
                        <li>Email: <a href="mailto:Bioenergi@gmail.com">Bioenergi@gmail.com</a></li>
                        <li>Telp: <a href="tel:+62123456789">+62 123456789</a></li>
                        <li>Alamat: Jl. Imam Bonjol, No.20</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
