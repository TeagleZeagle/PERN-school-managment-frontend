import React, {useState} from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";
import {IoMdArrowBack} from "react-icons/io";

const Admin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/login-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.access_token);

                // Decode the token manually
                const base64Url = data.access_token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const {username, role} = JSON.parse(jsonPayload);
                localStorage.setItem('username', username);

               if (role === 1) {
                    navigate('/admin-dashboard');
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
        <div className="admin-container">
            <div className="login-form">
                <IoMdArrowBack className="back-arrow" color="black" size={30} onClick={handleBackClick}/>
                <h2>Admin Girişi</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Kullanıcı Adı</p>
                        <input
                            type="text"
                            name="username"
                            placeholder="Kullanıcı Adı"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Admin;
