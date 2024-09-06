import React, { useEffect, useState } from 'react';
import './adminTeacher.css';
import EditModal from './EditModal.jsx';
import AddModal from './AddModal.jsx';

const AdminTeacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('https://pern-school-managment-backend.onrender.com/teachers');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleEdit = (teacher) => {
        setSelectedTeacher(teacher);
        setEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://pern-school-managment-backend.onrender.com/delete-teacher/${id}`, {
                method: 'DELETE',
            });
            setTeachers(teachers.filter(teacher => teacher.id !== id));
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleAdd = (newTeacher) => {
        setTeachers([...teachers, newTeacher]);
    };

    const handleSave = (updatedTeacher) => {
        setTeachers(teachers.map(teacher => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)));
    };

    const renderRows = teachers.map((teacher) => (
        <tr key={teacher.id}>
            <td>{teacher.id}</td>
            <td>{teacher.fname}</td>
            <td>{teacher.lname}</td>
            <td>{teacher.lesson}</td>
            <td>{teacher.email}</td>
            <td>****</td>
            <td>
                <button className="edit-teacher-button" onClick={() => handleEdit(teacher)}>Edit</button>
                <button className="delete-teacher-button" onClick={() => handleDelete(teacher.id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="admin-teacher-container">
            <table className="admin-teacher-table">
                <thead>
                <tr>
                    <th>Teacher No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Lesson</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
            <button className="add-teacher-button" onClick={() => setAddModalOpen(true)}>Add Teacher</button>
            {selectedTeacher && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    teacher={selectedTeacher}
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

export default AdminTeacher;
