import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import './sidebar.css';

const Sidebar = ({ role }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        if (role === 1) {
            localStorage.removeItem('username');
            navigate('/admin-login-page');
        } else if (role === 2) {
            localStorage.removeItem('email');
            navigate('/teacher');
        } else if (role === 3) {
            localStorage.removeItem('id');
            navigate('/student');
        }
    };

    const renderSidebarMenu = () => {
        let menuItems = [];
        if (role === 1) {
            menuItems = [
                { path: '/admin-dashboard/adminTeacher', label: 'Edit Teacher' },
                { path: '/admin-dashboard/studentAdmin', label: 'Edit Student' },
                { path: '/admin-dashboard/assignTeacher', label: 'Assign Teacher' }
            ];
        } else if (role === 2) {
            menuItems = [
                { path: '/teacher-dashboard/teacherSchedule', label: 'Schedule' },
                { path: '/teacher-dashboard/teacherClasses', label: 'Classes' },
                { path: '/teacher-dashboard/teacherNotes', label: 'Notes' },
                { path: '/teacher-dashboard/studentTeacher', label: 'Edit Student' }
            ];
        } else if (role === 3) {
            menuItems = [
                { path: '/student-dashboard/studentSchedule', label: 'Schedule' },
                { path: '/student-dashboard/studentNotes', label: 'Notes' },
                { path: '/student-dashboard/studentAbsenteeism', label: 'Absenteeism' }
            ];
        }

        return (
            <ul className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <li key={index} className="sidebar-item">
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
                <li  className="sidebar-item" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                    Sign Out
                </li>
            </ul>
        );
    };

    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
            {isSidebarOpen && (
                <>
                    <h2>Menu</h2>
                    {renderSidebarMenu()}
                </>
            )}
            <RxHamburgerMenu
                size={30}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hamburger-icon"
            />
        </div>
    );
};

export default Sidebar;
