import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar/Sidebar.jsx";
import { Routes, Route } from 'react-router-dom';
import AdminTeacher from './teacherManagement/adminTeacher.jsx';
import AssignTeacher from './teacherAssignment/assignTeacher.jsx';
import StudentAdmin from "./studentManagement/studentAdmin.jsx";
// Import other pages as needed

const AdminDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (!username) return;

            try {
                const response = await fetch(`https://pern-school-managment-backend.onrender.com/admin/${username}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div style={{ display: 'flex', color: 'black', fontWeight: 'bold' }}>
            <Sidebar role={user.role_id} />
            <div style={{ flex: 1, padding: '20px' }}>
                <Routes>
                    <Route path="adminTeacher" element={<AdminTeacher />} />
                    <Route path="assignTeacher" element={<AssignTeacher />} />
                    <Route path="studentAdmin" element={<StudentAdmin />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminDashboard;
