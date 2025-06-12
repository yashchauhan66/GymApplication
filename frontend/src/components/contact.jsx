import React from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';

const Contact = () => {
  const navigate = useNavigate();


  return (
    <div className="contact-container">
      <div className="contact-hero">
        <img src='https://images.unsplash.com/photo-1651340048650-9bb75627f3de?q=80&w=2027&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Gym Hero" className="hero-image" />
        <div className="border-2 border-black">
          <h1 className=''>Contact Us</h1>
          <p>Ready to start your fitness journey? Reach out to us for membership details, personal training, or any questions about our state-of-the-art facilities</p>
          
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>Nurpur Road Jaitra, Dhampur</p>
            <p>Near City Center, Easy Parking Available</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>For Membership: +91 9389507913</p>
            <p>For Personal Training: +91 9186507811</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email Us</h3>
            <p>Membership: chauhangym5979@gmail.com</p>
            <p>Training: chauhangym3887@gmail.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Gym Hours</h3>
            <p>Weekdays: 6:00 AM - 10:00 PM</p>
            <p>Weekends: 8:00 AM - 8:00 PM</p>
            <p>Holidays: 8:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Join Our Fitness Community</h2>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Your Phone" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Tell us about your fitness goals and how we can help you achieve them" rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn" onClick={()=>{navigate('/plans')}}>Start Your Fitness Journey</button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8762343765677!2d78.5107!3d29.3083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzI5LjkiTiA3OMKwMzAnMzguNSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Gym Location"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
