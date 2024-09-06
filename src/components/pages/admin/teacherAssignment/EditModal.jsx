import React, {useState, useEffect} from 'react';
import './EditModal.css';

const EditModal = ({isOpen, onClose, assignment, onSave}) => {
    const [teacher_id, setTeacher_id] = useState('');
    const [class_id, setClass_id] = useState('');

    useEffect(() => {
        if (assignment) {
            setTeacher_id(assignment.teacher_id);
            setClass_id(assignment.class_id);
        }
    }, [assignment]);

    const handleSave = async () => {
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/update-assignments`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...assignment, teacher_id, class_id}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedAssignment = await response.json();
            onSave(updatedAssignment);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error updating assignment:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Assignment</h2>
                <label>
                    Teacher NO:
                    <input
                        type="text"
                        value={teacher_id}
                        onChange={(e) => setTeacher_id(e.target.value)}
                    />
                </label>
                <label>
                    Class NO:
                    <input
                        type="text"
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
