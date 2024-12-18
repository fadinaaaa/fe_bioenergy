import React from 'react';
import Header from '../component/headerbisa.jsx';
import Footer from '../component/footer.jsx';
import '../css/header.css';
import '../css/footer.css';
import NewsList from '../component/newslist.jsx';

const NewsPage = () => {
    return (
        <div className="news-page">
            {/* Panggil Header */}
            <Header />

            <section className="news">
                <NewsList />
            </section>


            {/* Panggil Footer */}
            <Footer />
        </div>
    );
};

export default NewsPage;