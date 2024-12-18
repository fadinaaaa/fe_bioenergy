import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS
import image from '../assset/8.png';
import image1 from '../assset/9.png';
import image2 from '../assset/10.png';

const ImageCarousel = () => {
    return (
        <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        >
            <div>
                <img src={image} alt="" />
            </div>
            <div>
                <img src={image1} alt="" />
            </div>
            <div>
                <img src={image2} alt="" />
            </div>
            {/* Tambahkan lebih banyak gambar di sini */}
        </Carousel>
    );
};

export default ImageCarousel;
