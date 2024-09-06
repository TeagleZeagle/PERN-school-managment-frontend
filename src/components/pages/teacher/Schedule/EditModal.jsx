import React, { useState, useEffect } from 'react';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, schedule, onSave }) => {
    const [day, setDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [lessonId, setLessonId] = useState('');

    useEffect(() => {
        if (schedule) {
            setDay(schedule.day || '');
            setStartTime(schedule.start_time || '');
            setEndTime(schedule.end_time || '');
            setLessonId(schedule.lesson_id || '');
        }
    }, [schedule]);

    const handleSave = async () => {
        if (!day || !startTime || !endTime || !lessonId) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('https://pern-school-managment-backend.onrender.com/update-schedule', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    day,
                    start_time: startTime,
                    end_time: endTime,
                    lesson_id: lessonId,
                    id: schedule.id
                })
            });

            if (response.ok) {
                const updatedSchedule = {
                    ...schedule,
                    day,
                    start_time: startTime,
                    end_time: endTime,
                    lesson_id: lessonId,
                };
                onSave(updatedSchedule);
                onClose();
                window.location.reload();
            } else {
                console.error('Error updating schedule:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };

    if (!isOpen || !schedule) return null;

    return (
        <div className="edit-modal-overlay">
            <div className="edit-modal-content">
                <h2>Edit Schedule for {schedule.lesson}</h2>
                <div className="modal-field">
                    <label>Day</label>
                    <input
                        type="text"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="Enter day..."
                        readOnly
                    />
                </div>
                <div className="modal-field">
                    <label>Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="modal-field">
                    <label>End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        readOnly
                    />
                </div>
                <div className="modal-field">
                    <label>Class No</label>
                    <input
                        type="number"
                        value={lessonId} // Using lessonId
                        onChange={(e) => setLessonId(e.target.value)}
                        placeholder="Enter class no..."
                    />
                </div>
                <div className="modal-actions">
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
