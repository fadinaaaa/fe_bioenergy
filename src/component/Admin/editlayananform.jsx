import React, { useState, useEffect } from 'react';

const EditLayananForm = ({ layanan, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        category: '',
        address: '',
        date: '',
        status: '',
    });

    useEffect(() => {
        // Set form data to the current layanan data when the modal is opened
        if (layanan) {
            setFormData({
                category: layanan.category,
                address: layanan.address,
                date: layanan.date,
                status: layanan.status,
            });
        }
    }, [layanan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new updatedLayanan object
        const updatedLayanan = {
            ...layanan,
            ...formData, // Update with new form data
        };

        onUpdate(updatedLayanan); // Pass the updatedLayanan to the parent to update the list
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Layanan</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Kategori</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="rumah tangga">Rumah Tangga</option>
                            <option value="industri">Industri</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Alamat</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Tanggal</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="diajukan">Diajukan</option>
                            <option value="proses">Proses</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">Update</button>
                        <button type="button" onClick={onCancel} className="cancel-button">Batal</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditLayananForm;
