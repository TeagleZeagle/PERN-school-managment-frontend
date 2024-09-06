import React, {useEffect, useState} from 'react';
import AddModal from "./AddModal.jsx";
import EditModal from "./EditModal.jsx";
import './assignTeacher.css';

const AssignTeacher = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignments, setSelectedAssignments] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch('https://pern-school-managment-backend.onrender.com/class-assignments');
                const data = await response.json();
                setAssignments(data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    const handleEdit = (assignment) => {
        setSelectedAssignments(assignment);
        setEditModalOpen(true);
    }

    const handleAdd = (newAssignment) => {
        setAssignments([...assignments, newAssignment]);
    };

    const handleSave = (updatedAssignment) => {
        setAssignments(assignments.map(assignment => (assignment.id === updatedAssignment.id ? updatedAssignment : assignment)));
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`https://pern-school-managment-backend.onrender.com/delete-assignments/${id}`, {
                method: 'DELETE',
            });
            setAssignments(assignments.filter(assignment => assignment.id !== id));
        } catch (error) {
            console.error('Error deleting assigment', error)
        }
    };


    const renderRows = assignments.map((assignment) => (
        <tr key={assignment.id}>
            <td>{assignment.id}</td>
            <td>{assignment.fname + ' ' + assignment.lname}</td>
            <td>{assignment.grade + ' ' + assignment.section}</td>
            <td>
                <button className="edit-assignment-button" onClick={() => handleEdit(assignment)}>Edit</button>
                <button className="delete-assignment-button" onClick={() => handleDelete(assignment.id)}>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div className="admin-assignment-container">
            <table className="admin-assignment-table">
                <thead>
                <tr>
                    <th>Assignments No.</th>
                    <th>Teacher Name</th>
                    <th>Class</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
            <button className="add-assignment-button" onClick={() => setAddModalOpen(true)}>Add Assignment</button>
            {selectedAssignments && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    assignment={selectedAssignments}
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

export default AssignTeacher;
