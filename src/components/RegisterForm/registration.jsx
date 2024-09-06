import React, { useState } from 'react';
import './register.css';
import {IoMdArrowBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        b_date: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://pern-school-managment-backend.onrender.com/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert('Student registered successfully');
            } else {
                alert('An error occurred during registration');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="register-container">
            <div className="login-form">
                <IoMdArrowBack className="back-arrow" color="black" size={30} onClick={handleBackClick}/>
                <h1>Kayıt Ol</h1>
                <form onSubmit={handleSubmit}>
                    <p>Ad</p>
                    <input
                        type="text"
                        name="fname"
                        placeholder="Ad"
                        value={formData.fname}
                        onChange={handleChange}
                    />
                    <p>Soyad</p>
                    <input
                        type="text"
                        name="lname"
                        placeholder="Soyad"
                        value={formData.lname}
                        onChange={handleChange}
                    />
                    <p>Doğum Tarihi</p>
                    <input
                        type="date"
                        name="b_date"
                        placeholder="Doğum Tarihi"
                        value={formData.b_date}
                        onChange={handleChange}
                    />
                    <p>E-posta</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-posta"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <p>Şifre</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Şifre"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Hesap Oluştur</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
