import React, { useState } from 'react';
import './Signup.css';

export default function Signup() {

    // integrate with backend

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [msg, setMsg] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log(formData);

    const response = await fetch("http://localhost:8000/api/signup" || "https://authontication-production.up.railway.app/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (response.ok) {
      setMsg(data.message);
    } else {
      setMsg(data.message);
    }
    
};

    return (
        <div className="signup-container">
            <div className="signup-box">
                <div className="signup-header">
                    <h1>Create Account</h1>
                    <p>Join us and start your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="name"> Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <button type="submit" className="signup-button" onClick={handleSubmit}>
                        Create Account
                    </button>
                </form>

                <div className="login-link">
                    Already have an account? <a href="#">Sign in</a>
                </div>
            </div>
        </div>
    );
}
