import './App.css';
import Home from "./components/Home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "./components/LoginForm/student/student.jsx";
import Teacher from "./components/LoginForm/teacher/teacher.jsx";
import Registration from "./components/RegisterForm/registration.jsx";
import Admin from "./components/LoginForm/admin/admin.jsx";
import StudentDashboard from "./components/pages/student/studentDashboard.jsx";
import AdminDashboard from "./components/pages/admin/adminDashboard.jsx";
import TeacherDashboard from "./components/pages/teacher/teacherDashboard.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-login-page" element={<Admin />} />
                <Route path="/student" element={<Student />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/student-dashboard/*" element={<StudentDashboard />} />
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
