import React, { useEffect, useState } from 'react';
import './studentNotes.css';

const StudentNotes = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`https://pern-school-managment-backend.onrender.com/notes`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const renderRows = students.map((student) => (
        <tr key={student.id}>
            <td>{student.lesson}</td>
            <td>{student.notes}</td>
        </tr>
    ));

    return (
        <div className="student-notes-container">
            <h1 className="page-title">Student Notes</h1>
            <table className="student-notes-table">
                <thead>
                <tr>
                    <th>Lesson</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
        </div>
    );
};

export default StudentNotes;
