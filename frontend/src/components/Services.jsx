import React, { useState, useEffect } from 'react';
import './Services.css';

const Services = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExercises();
    }, []);

    const fetchExercises = async () => {
        try {
            // Try the production URL first
            const baseUrl = "https://authontication-production.up.railway.app/api/exercises/";
            const response = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched data:", data); // Debug log
            setExercises(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching exercises:", err); // Debug log
            setError(`Failed to fetch exercises: ${err.message}`);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="services">
                <div className="loading">Loading exercises...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="services">
                <div className="error">
                    <h2>Error Loading Exercises</h2>
                    <p>{error}</p>
                    <button 
                        className="retry-button"
                        onClick={() => {
                            setLoading(true);
                            setError(null);
                            fetchExercises();
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='services'>
            <h1 className="services-title">Our Exercises</h1>
            <div className='services-grid'>
                {exercises && exercises.length > 0 ? (
                    exercises.map((exercise, index) => (
                        <div key={index} className='card-container'>
                            <div className='card-image'>
                                <img 
                                    src={exercise.images && exercise.images[0] 
                                        ? `https://ik.imagekit.io/yuhonas/${exercise.images[0]}`
                                        : 'https://via.placeholder.com/300x200?text=No+Image+Available'
                                    } 
                                    alt={exercise.name || 'Exercise'} 
                                />
                            </div>
                            <div className='card-content'>
                                <h2>{exercise.name || 'Unnamed Exercise'}</h2>
                                <div className="exercise-details">
                                    <p><strong>Force:</strong> {exercise.force || 'N/A'}</p>
                                    <p><strong>Level:</strong> {exercise.level || 'N/A'}</p>
                                    <p><strong>Mechanic:</strong> {exercise.mechanic || 'N/A'}</p>
                                    <p><strong>Equipment:</strong> {exercise.equipment || 'N/A'}</p>
                                    <p><strong>Category:</strong> {exercise.category || 'N/A'}</p>
                                </div>
                                <button className="book-button">Learn More</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-exercises">
                        <p>No exercises available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Services;