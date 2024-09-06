import React, { useState } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, student, onSave }) => {
    const [notes, setNotes] = useState(student.notes !== null ? student.notes : '');

    const handleSave = async () => {
        if (notes !== '' && (isNaN(notes) || notes < 0 || notes > 100)) {
            alert("Please enter a valid notes between 0 and 100.");
            return;
        }

        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/upsert-notes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ notes: notes !== '' ? parseInt(notes) : null, student_id: student.id, lesson_id: student.l_id , teacher_id : student.teacher_id})
            });

            if (response.ok) {
                const updatedStudent = { ...student, notes: notes !== '' ? parseInt(notes) : null };
                onSave(updatedStudent);
                onClose();
            } else {
                console.error('Error updating notes:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating notes:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <h2>Edit Notes for {student.fname} {student.lname}</h2>
                <input
                    type="number"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter notes here..."

                />
                <div className="modal-actions">
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
