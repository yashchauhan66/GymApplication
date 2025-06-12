import React, { useState, useEffect } from 'react';
import './Reviews.css';
import gym3 from '../assets/gym3.jpg';

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('gymReviews');
    return savedReviews ? JSON.parse(savedReviews) : [
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing gym with great equipment and friendly staff!",
        date: "2024-03-15"
      },
      {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Very clean facility and excellent trainers.",
        date: "2024-03-14"
      }
    ];
  });

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('gymReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: Date.now(),
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    };
    
    setReviews(prevReviews => [review, ...prevReviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      const newReviewElement = document.getElementById(`review-${review.id}`);
      if (newReviewElement) {
        newReviewElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
    }
  };

  return (
    <div className="reviews-page">
      <div className="reviews-hero" style={{ backgroundImage: `url(${gym3})` }}>
        <div className="hero-overlay">
          <h1>Customer Reviews</h1>
          <p>Share your experience with us</p>
        </div>
      </div>

      <div className="reviews-content">
        {showSuccess && (
          <div className="success-message">
            <span>✓</span> Thank you for your review! It has been posted successfully.
          </div>
        )}

        <div className="reviews-grid">
          <div className="review-form-section">
            <div className="review-form">
              <h2>Write a Review</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="rating-select">
                    <label>Your Rating:</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                    >
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num} Stars</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Share your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                  />
                </div>
                <button type="submit" className="submit-review-btn">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          <div className="reviews-list">
            {reviews.map(review => (
              <div 
                key={review.id} 
                id={`review-${review.id}`}
                className={`review-card ${review.id === reviews[0]?.id ? 'new-review' : ''}`}
              >
                <div className="review-header">
                  <div className="reviewer-info">
                    <h3>{review.name}</h3>
                    <p className="review-date">{review.date}</p>
                  </div>
                  <div className="rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i} className="star empty">☆</span>
                    ))}
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
                <button 
                  className="delete-review-btn"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews; 