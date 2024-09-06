import React, { useState } from 'react';
import './AddModal.css';

const AddModal = ({ isOpen, onClose, onAdd }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [b_date, setB_date] = useState('');
    const [class_id, setClass_id] = useState('');

    const handleAdd = async () => {
        try {
            console.log('Adding student with data:', { fname, lname, email, password, b_date, class_id });
            const response = await fetch('https://pern-school-managment-backend.onrender.com/add-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fname, lname, email, password, b_date, class_id, role_id: 3 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const newStudent = await response.json();
            console.log('New Student added:', newStudent);
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
                <label>
                    BirthDate:
                    <input
                        type="date"
                        value={b_date}
                        onChange={(e) => setB_date(e.target.value)}
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
