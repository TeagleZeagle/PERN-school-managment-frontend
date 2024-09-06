import React, {useState} from 'react';
import './styles.css';
import {Link, useNavigate} from 'react-router-dom';
import {IoMdArrowBack} from "react-icons/io";

const Student = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/student-login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, password})
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('id', data.user.id);
                if (data.user.role === 3) {
                    navigate('/student-dashboard');
                }
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            console.error('An error occurred:', err);
            setError('An error occurred during login');
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="student-container">
            <div className="login-form">
                <IoMdArrowBack className="back-arrow" color="black" size={30} onClick={handleBackClick}/>
                <h2>Öğrenci Girişi</h2>
                <p>Öğrenci Numarası</p>
                <input
                    type="number"
                    name="student"
                    value={id}
                    placeholder="Öğrenci Numarası"
                    onChange={(e) => setId(e.target.value)}
                />
                <p>Şifre</p>
                <input
                    type="password"
                    name="s_sifre"
                    value={password}
                    placeholder="Şifre"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Giriş Yap</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <p style={{textAlign: "center"}}>Hesabınız yok mu? <Link style={{color: "blue"}} to="/register">Hesap
                    oluşturun.</Link></p>
            </div>
        </div>
    );
};

export default Student;
