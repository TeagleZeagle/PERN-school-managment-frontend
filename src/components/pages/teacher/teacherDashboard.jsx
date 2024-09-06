import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import StudentTeacher from "./studentManagement/studentTeacher.jsx";
import TeacherNotes from "./Notes/teacherNotes.jsx";
import TeacherClasses from "./Classes/teacherClasses.jsx";
import TeacherSchedule from "./Schedule/teacherSchedule.jsx";

const TeacherDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (!email) return;

            try {
                const response = await fetch(`https://pern-school-managment-backend.onrender.com/teacher/${email}`, {
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
        <div style={{ display: "flex", color: 'black', fontWeight: 'bold' }}>
            <Sidebar role={user.role_id} />
            <Routes>
                <Route path="teacherSchedule" element={<TeacherSchedule />} />
                <Route path="teacherClasses" element={<TeacherClasses />} />
                <Route path="teacherNotes" element={<TeacherNotes />} />
                <Route path="studentTeacher" element={<StudentTeacher />} />
            </Routes>
        </div>
    );
};

export default TeacherDashboard;
