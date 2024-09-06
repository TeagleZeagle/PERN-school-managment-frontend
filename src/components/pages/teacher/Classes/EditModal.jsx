import React, {useState, useEffect} from 'react';
import './EditModal.css';

const EditModal = ({isOpen, onClose, student, onSave}) => {
    const [class_id, setClass_id] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (student) {
            setClass_id(student.class_id);
            setId(student.id)
        }
    }, [student]);

    const handleSave = async () => {
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/updt-class-student`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...student, class_id, id}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updateStudent = await response.json();
            onSave(updateStudent);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Student</h2>
                <label>
                    Student No:
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        readOnly
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
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
