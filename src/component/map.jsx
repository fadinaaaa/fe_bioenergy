import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Mengatasi masalah dengan ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MyMap = () => {
    const [positions, setPositions] = useState([]);
    const [search, setSearch] = useState(''); // State untuk pencarian kecamatan
    const [filteredPositions, setFilteredPositions] = useState([]);

    useEffect(() => {
        fetch('https://example.com/api/locations') // Ganti dengan URL API Anda
            .then(response => response.json())
            .then(data => {
                setPositions(data);
                setFilteredPositions(data); // Set initial positions
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        // Filter berdasarkan nama kecamatan
        if (search) {
            const filtered = positions.filter(pos =>
                pos.kecamatan.toLowerCase().includes(search.toLowerCase()) // Misal field 'kecamatan' di data API
            );
            setFilteredPositions(filtered);
        } else {
            setFilteredPositions(positions); // Tampilkan semua posisi jika tidak ada pencarian
        }
    }, [search, positions]);

    // Koordinat Madiun (sebagai pusat peta)
    const madiunPosition = [-7.629823, 111.523087];

    return (
        <div>
            <input
                type="text"
                placeholder="Cari Kecamatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)} // Update search state
                style={{ padding: '10px', width: '300px', marginBottom: '10px' }}
            />
            <MapContainer center={madiunPosition} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredPositions.map((pos, index) => (
                    <Marker key={index} position={[pos.lat, pos.lng]}>
                        <Popup>Lokasi: {pos.name}<br />Kecamatan: {pos.kecamatan}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MyMap;
