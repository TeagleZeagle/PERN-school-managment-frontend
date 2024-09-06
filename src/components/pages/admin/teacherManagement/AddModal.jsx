import React, { useState } from 'react';
import './AddModal.css';

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [lesson, setLesson] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAdd = async () => {
        try {
            console.log('Adding teacher with data:', { fname, lname, lesson, email, password });
            const response = await fetch('https://pern-school-managment-backend.onrender.com/add-teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname, lname, lesson, email, password, role_id: 2 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newTeacher = await response.json();
            console.log('New teacher added:', newTeacher);
            onAdd(newTeacher);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Teacher</h2>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </label>
                <label>
                    Lesson:
                    <input
                        type="text"
                        value={lesson}
                        onChange={(e) => setLesson(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
