    import React from 'react';
    import Header from '../component/header.jsx';
    import Footer from '../component/footer.jsx';
    import { Line } from "react-chartjs-2";
    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    import '../css/header.css';
    import '../css/footer.css';
    import '../css/statistik.css';

    // Mendaftarkan skala yang diperlukan
    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

    const StatistikPage = () => {
    // Data untuk grafik
    const dataProduksiBiomassa = {
        labels: ["Jan 1", "Jan 9", "Jan 13", "Jan 17", "Jan 21", "Jan 25", "Jan 29"],
        datasets: [
        {
            label: "Produksi Biomassa",
            data: [50, 48, 45, 40, 35, 30, 28],
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
        },
        ],
    };

    const dataPengelolaanSampah = {
        labels: ["00.00", "06.00", "12.00", "18.00", "24.00"],
        datasets: [
        {
            label: "Produksi Sampah",
            data: [10, 30, 40, 50, 40],
            fill: false,
            borderColor: "#ff6384",
            tension: 0.1,
        },
        {
            label: "Sampah yang telah dikelola",
            data: [5, 20, 35, 45, 35],
            fill: false,
            borderColor: "#36a2eb",
            tension: 0.1,
        },
        ],
    };

    return (
        <div className="statistik-page">
        {/* Panggil Header */}
        <Header />

        {/* Bagian Statistik */}
        <section className="statistics">
            <h3>Data Statistika Biomassa</h3>
            <div className="chart-container">
            <div className="chart">
                <h4>Produksi Biomassa</h4>
                <Line data={dataProduksiBiomassa} />
            </div>
            <div className="chart">
                <h4>Pengelolaan Sampah</h4>
                <Line data={dataPengelolaanSampah} />
            </div>
            </div>
        </section>

        {/* Panggil Footer */}
        <Footer />
        </div>
    );
    };

    export default StatistikPage;
