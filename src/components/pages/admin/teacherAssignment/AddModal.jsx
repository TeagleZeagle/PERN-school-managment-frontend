import React, { useState } from 'react';
import './AddModal.css';

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [teacher_id, setTeacher_id] = useState('');
    const [class_id, setClass_id] = useState('');

    const handleAdd = async () => {
        try {
            console.log('Adding assignment with data:', { teacher_id, class_id });
            const response = await fetch('https://pern-school-managment-backend.onrender.com/add-assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teacher_id, class_id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newAssignment = await response.json();
            console.log('New assigment added:', newAssignment);
            onAdd(newAssignment);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Assignment</h2>
                <label>
                    Teacher No:
                    <input
                        type="number"
                        value={teacher_id}
                        onChange={(e) => setTeacher_id(e.target.value)}
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
