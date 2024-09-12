import React, { useEffect, useState } from 'react';
import './studentSchedule.css';

const StudentSchedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch('https://pern-school-managment-backend.onrender.com/student-schedule', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setSchedule(data);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchSchedule();
    }, []);

    const renderRows = () => {
        const times = ['08:00-08:50', '09:00-09:50', '10:00-10:50', '11:00-11:50', '12:00-12:50'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        return times.map((time, index) => {
            const [startTime] = time.split('-');
            return (
                <tr key={index}>
                    <td>{time}</td>
                    {days.map((day) => {
                        const slot = schedule.find(sch => {
                            const slotStartTime = sch.start_time.substring(0, 5);
                            return sch.day === day && slotStartTime === startTime;
                        });
                        return (
                            <td key={day}>
                                {slot ? (
                                    <div>{slot.lesson}</div>
                                ) : '—'}
                            </td>
                        );
                    })}
                </tr>
            );
        });
    };

    return (
        <div className="teacher-schedule-container">
            <table className="teacher-schedule-table">
                <thead>
                <tr>
                    <th>Hours</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                </tr>
                </thead>
                <tbody>
                {renderRows()}
                </tbody>
            </table>
        </div>
    );
};

export default StudentSchedule;
