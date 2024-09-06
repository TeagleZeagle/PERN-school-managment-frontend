import React, { useEffect, useState } from "react";
import Sidebar from "../../SideBar/Sidebar.jsx";
import {Route, Routes} from "react-router-dom";
import StudentNotes from "./Notes/studentNotes.jsx";
import StudentAbsenteeism from "./Absenteeism/studentAbsenteeism.jsx"
import StudentSchedule from "./Schedule/studentSchedule.jsx";
const StudentDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const id = localStorage.getItem('id')
            if(!id) return;
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/student/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user)

            }
        };
        fetchUserData();
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div style={{  fontWeight: 'bold' }}>
            <Sidebar role={user.role_id} />
            <Routes>
                <Route path="studentSchedule" element={<StudentSchedule/>}/>
                <Route path="studentNotes" element={<StudentNotes/>}/>
                <Route path="studentAbsenteeism" element={<StudentAbsenteeism/>}/>
            </Routes>
        </div>

    )
}
export default StudentDashboard;