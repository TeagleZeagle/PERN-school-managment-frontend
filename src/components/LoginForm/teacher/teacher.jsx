import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Teacher = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/login-teacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);

                // Decode the token manually (same as in admin)
                const base64Url = data.access_token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const { email, role } = JSON.parse(jsonPayload);
                localStorage.setItem('email', email);
                
                if (role === 2) {
                    navigate('/teacher-dashboard');
                } else {
                    setError('Unauthorized access');
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
        <div className="teacher-container">
            <div className="login-form">
                <IoMdArrowBack className="back-arrow" color="black" size={30} onClick={handleBackClick} />
                <h2>Öğretmen Girişi</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>E-posta</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-posta"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p>Şifre</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Giriş Yap</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Teacher;
