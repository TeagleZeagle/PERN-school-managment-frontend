import React, {useState, useEffect} from 'react';
import './EditModal.css';

const EditModal = ({isOpen, onClose, teacher, onSave}) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [lesson, setLesson] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (teacher) {
            setFname(teacher.fname);
            setLname(teacher.lname);
            setLesson(teacher.lesson);
            setEmail(teacher.email);
            setPassword(teacher.password);
        }
    }, [teacher]);

    const handleSave = async () => {
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/update-teacher`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...teacher, fname, lname, lesson, email, password}),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedTeacher = await response.json();
            onSave(updatedTeacher);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Teacher</h2>
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
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
