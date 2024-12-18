import React, { useState, useEffect } from 'react';

const EditNewsForm = ({ news, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        judul_berita: "",
        image: null,
        tanggal_berita: "",
        URL: "",
    });

    // Set initial form data when news is passed in
    useEffect(() => {
        if (news) {
            setFormData({
                judul_berita: news.judul_berita || "",
                image: null,
                tanggal_berita: news.tanggal_berita || "",
                URL: news.URL || "",
            });
        }
    }, [news]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Updated ${name}:`, value); // Log changes
    };

    // Handle image file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            image: file
        }));
        console.log('Selected image:', file); // Log file selection
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Log the form data before submission
        console.log('Form Data Before Submission:', formData);

        // Check if required fields are filled
        if (!formData.judul_berita) {
            alert("Judul berita tidak boleh kosong."); // Alert if empty
            return;
        }

        const updatedNews = new FormData();
        updatedNews.append('judul_berita', formData.judul_berita);
        updatedNews.append('tanggal_berita', formData.tanggal_berita);
        updatedNews.append('URL', formData.URL);


        if (formData.image) {
            updatedNews.append('image', formData.image); // Append image if provided
        }

        console.log('Submitting:', updatedNews); // Log the FormData object for debugging

        onSubmit({ id: news.id, data: updatedNews });  // Pass updated news to parent component
        onClose();  // Close modal after submission
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Berita</h3>
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
                        />
                        {formData.image && (
                            <div className="image-preview">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Preview Gambar"
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                            </div>
                        )}
                        {!formData.image && news.image && (
                            <div className="image-preview">
                                <img
                                    src={`http://127.0.0.1:8000/storage/${news.image}`} // Adjust the URL as needed
                                    alt="Current Gambar"
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Tanggal</label>
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
                        <button type="submit" className="submit-button">Simpan Perubahan</button>
                        <button type="button" onClick={onClose} className="cancel-button">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNewsForm;