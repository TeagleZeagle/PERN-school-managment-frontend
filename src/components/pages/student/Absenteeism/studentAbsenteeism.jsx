import React, { useEffect, useState } from 'react';
import './studentAbsenteeism.css';

const StudentAbsenteeism = () => {
    const [absenteeismRecords, setAbsenteeismRecords] = useState([]);

    useEffect(() => {
        const fetchAbsenteeismRecords = async () => {
            try {
                const response = await fetch(`https://pern-school-managment-backend.onrender.com/absenteeism`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setAbsenteeismRecords(data);
            } catch (error) {
                console.error('Error fetching absenteeism records:', error);
            }
        };

        fetchAbsenteeismRecords();
    }, []);

    const renderRows = absenteeismRecords.map((record) => (
        <React.Fragment key={record.id}>
            <tr>
                <td>{record.school_absence}</td>
                <td>{new Date(record.created_at).toLocaleDateString()}</td>
            </tr>
            <tr>
                <td colSpan="2" className="remaining-absence">
                    Remaining Absence: {20 - record.school_absence}
                </td>
            </tr>
        </React.Fragment>
    ));

    return (
        <div className="student-absenteeism-container">
            <h1 className="page-title">Student Absenteeism</h1>
            <table className="student-absenteeism-table">
                <thead>
                <tr>
                    <th>Absence</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {renderRows}
                </tbody>
            </table>
        </div>
    );
};

export default StudentAbsenteeism;
