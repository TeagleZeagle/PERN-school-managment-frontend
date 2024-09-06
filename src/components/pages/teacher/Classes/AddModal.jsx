import React, { useState } from 'react';
import './AddModal.css';

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [id, setId] = useState('');
    const [class_id, setClass_id] = useState('');

    const handleAdd = async () => {
        try {
            console.log('Adding student with data:', { class_id, id });
            const response = await fetch('https://pern-school-managment-backend.onrender.com/updt-class-student', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ class_id, id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newStudent = await response.json();
            onAdd(newStudent);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Student</h2>
                <label>
                    Student No:
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label>
                <label>
                    Class No:
                    <input
                        type="number"
                        value={class_id}
                        onChange={(e) => setClass_id(e.target.value)}
                    />
                </label>
                <div className="modal-buttons">
                    <button className="save-button" onClick={handleAdd}>Add</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
