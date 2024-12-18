import React, { useState, useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import '../../css/Admin/dashboard.css';
import Sidebars from '../../component/Admin/sidebars';

// Mendaftarkan modul Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    // Data Dummy
    const [jumlahLayanan, setJumlahLayanan] = useState({
        diajukan: 0,
        selesai: 0,
        proses: 0,
    });
    const [jumlahPengaduan, setJumlahPengaduan] = useState({
        diajukan: 0,
        selesai: 0,
        proses: 0,
    });
    const [jumlahRumahTangga, setJumlahRumahTangga] = useState([100, 120, 130, 140]); // Dummy data untuk beberapa periode
    const [jumlahIndustri, setJumlahIndustri] = useState([50, 60, 70, 80]); // Dummy data untuk beberapa periode

    useEffect(() => {
        // Data Dummy
        setJumlahLayanan({
            diajukan: 7,
            selesai: 5,
            proses: 2,
        });
        setJumlahPengaduan({
            diajukan: 5,
            selesai: 3,
            proses: 1,
        });
    }, []);

    // Data untuk Line Chart
    const dataLine = {
        labels: ['Periode 1', 'Periode 2', 'Periode 3', 'Periode 4'], // Label untuk sumbu X
        datasets: [
            {
                label: 'Rumah Tangga',
                data: jumlahRumahTangga,
                borderColor: '#36A2EB',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                fill: true,
            },
            {
                label: 'Industri',
                data: jumlahIndustri,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                fill: true,
            },
        ],
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Periode',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Jumlah',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard-container">
            <div className="sidebars">
                <Sidebars />
            </div>

            <div className="main-content">
                <section className="profile-details">
                    <h2>Dashboard</h2>
                </section>

                <div className="dashboard-stats">
                    <div className="stat-item">
                        <h3>Layanan Diajukan</h3>
                        <p>{jumlahLayanan.diajukan}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Layanan Proses</h3>
                        <p>{jumlahLayanan.proses}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Layanan Selesai</h3>
                        <p>{jumlahLayanan.selesai}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Pengaduan Diajukan</h3>
                        <p>{jumlahPengaduan.diajukan}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Pengaduan Proses</h3>
                        <p>{jumlahPengaduan.proses}</p>
                    </div>
                    <div className="stat-item">
                        <h3>Pengaduan Selesai</h3>
                        <p>{jumlahPengaduan.selesai}</p>
                    </div>
                </div>

                {/* Grafik Line untuk Rumah Tangga dan Industri */}
                <div className="chart">
                    <h3>Rumah Tangga dan Industri</h3>
                    <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                        <Line data={dataLine} options={optionsLine} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
