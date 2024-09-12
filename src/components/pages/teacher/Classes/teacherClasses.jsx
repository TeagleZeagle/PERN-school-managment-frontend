import React, { useEffect, useState } from 'react';
import './teacherClasses.css';
import EditModal from './EditModal.jsx';
import AddModal from './AddModal.jsx';

const TeacherClasses = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`https://pern-school-managment-backend.onrender.com/your-class`, {
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

    const handleRemove = async (id) => {
        try {
            await fetch('https://pern-school-managment-backend.onrender.com/remove-class', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleAdd = (newStudent) => {
        setStudents([...students, newStudent]);
    };

    const handleSave = (updatedStudent) => {
        setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
    };

    const renderRows = students.map((student) => (
        <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.fname}</td>
            <td>{student.lname}</td>
            <td>{student.grade !== null && student.section !== null ? `${student.grade} - ${student.section}` : ''}</td>
            <td>
                <button className="edit-student-button" onClick={() => handleEdit(student)}>Edit</button>
                <button className="remove-student-button" onClick={() => handleRemove(student.id)}>Remove</button>
            </td>
        </tr>
    ));

    return (
        <div className="teacher-class-container">
            <table className="teacher-class-table">
                <thead>
                <tr>
                    <th>Student No.</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Class</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
            <button className="add-student-button" onClick={() => setAddModalOpen(true)}>Add Student</button>
            {selectedStudent && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    student={selectedStudent}
                    onSave={handleSave}
                />
            )}
            <AddModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAdd}
            />
        </div>
    );
};

export default TeacherClasses;
