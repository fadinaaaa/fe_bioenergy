import React, { useState } from 'react';

const AddNewsForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        judul_berita: '',
        image: null,
        tanggal_berita: '',
        URL: '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file change for image upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const newNews = new FormData(); // Create a new FormData instance
        
        newNews.append('judul_berita', formData.judul_berita);
        newNews.append('image', formData.image);
        newNews.append('tanggal_berita', formData.tanggal_berita);
        newNews.append('URL', formData.URL);
        
        onSubmit(newNews);  // Submit the new news to parent component
        onClose();  // Close the modal after submission
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Judul Berita</label>
                        <input
                            type="text"
                            name="judul_berita"
                            value={formData.judul_berita}
                            onChange={handleChange}
                            placeholder="Masukkan judul berita"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Gambar</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tanggal Berita</label>
                        <input
                            type="date"
                            name="tanggal_berita"
                            value={formData.tanggal_berita}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>URL Berita</label>
                        <input
                            type="text"
                            name="URL"
                            value={formData.URL}
                            onChange={handleChange}
                            placeholder="Masukkan URL berita"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Tambah Berita</button>
                        <button type="button" onClick={onClose} className="cancel-button">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewsForm;