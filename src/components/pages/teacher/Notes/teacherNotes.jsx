import React, { useEffect, useState } from 'react';
import './teacherNotes.css';
import EditModal from './EditModal';

const TeacherNotes = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('https://pern-school-managment-backend.onrender.com/your-notes', {
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

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setEditModalOpen(true);
    };

    const handleSave = (updatedStudent) => {
        setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
    };

    const renderRows = students.map((student) => (
        <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.fname}</td>
            <td>{student.lname}</td>
            <td>{student.grade && student.section ? `${student.grade} - ${student.section}` : ''}</td>
            <td>{student.lesson}</td>
            <td>{student.notes}</td>
            <td>
                <button className="edit-notes-button" onClick={() => handleEdit(student)}>Edit</button>
            </td>
        </tr>
    ));

    return (
        <div className="teacher-notes-container">
            <table className="teacher-notes-table">
                <thead>
                <tr>
                    <th>Student No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Class</th>
                    <th>Lesson</th>
                    <th>Notes</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
            {selectedStudent && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    student={selectedStudent}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default TeacherNotes;
