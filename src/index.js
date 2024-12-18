import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'leaflet/dist/leaflet.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Pastikan serviceWorkerRegistration sudah ada

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Jika Anda ingin aplikasi bekerja secara offline dan memuat lebih cepat,
// Anda bisa mengubah unregister() menjadi register() di bawah ini.
serviceWorkerRegistration.register();

// Jika Anda ingin mengukur performa aplikasi Anda, kirimkan data ke layanan analitik.
reportWebVitals();
