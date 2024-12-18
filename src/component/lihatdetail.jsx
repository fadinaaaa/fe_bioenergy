import React from 'react';
import '../css/lihatdetail.css'; // Pastikan Anda punya styling modal

function LihatDetail({ pengaduan, handleClose }) {
    if (!pengaduan) return null;

    return (
        <div className="modal-layann-overlay" id="lihatdetail">
            <div className="modal-layanan-content">
                <h2>Detail Pengaduan</h2>

                {/* Kolom 1: Informasi */}
                <div className="modal-layanan-columns">
                    {/* Keterangan Masalah */}
                    <div className="moda-layanan-column">
                        <p><strong>Keterangan Masalah:</strong> {pengaduan.keteranganMasalah}</p>
                    </div>

                    {/* Tanggal Pengaduan */}
                    <div className="moda-layanan-column">
                        <p><strong>Tanggal Pengaduan:</strong> {pengaduan.tanggalPengaduan}</p>
                    </div>

                    {/* Foto Pengaduan */}
                    <div className="moda-layanan-column">
                        <strong>Foto Pengaduan:</strong>
                        <img src={pengaduan.fotoPengaduan} alt="Foto Pengaduan" />
                    </div>

                    {/* Tanggal Selesai */}
                    <div className="moda-layanan-column">
                        <p><strong>Tanggal Selesai:</strong> {pengaduan.tanggalSelesai || 'Belum selesai'}</p>
                    </div>

                    {/* Foto Selesai */}
                    <div className="moda-layanan-column">
                        {pengaduan.fotoSelesai ? (
                            <div>
                                <strong>Foto Selesai:</strong>
                                <img src={pengaduan.fotoSelesai} alt="Foto Selesai" />
                            </div>
                        ) : (
                            <div><strong>Foto Selesai:</strong> Belum ada foto selesai.</div>
                        )}
                    </div>

                    {/* Status */}
                    <div className="moda-layanan-column">
                        <p><strong>Status:</strong> {pengaduan.status}</p>
                    </div>
                </div>

                {/* Tombol Tutup */}
                <button className="tutup-layanan" onClick={handleClose}>Tutup</button>
            </div>
        </div>
    );
}

export default LihatDetail;
