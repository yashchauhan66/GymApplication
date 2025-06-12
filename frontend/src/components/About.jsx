import React from 'react';
import './About.css';

const About = () => {
  const cardGroups = [
    {
      title: "Our Mission",
      cards: [
        {
          title: "Transform Lives",
          description: "Helping our members achieve their fitness goals and lead healthier lifestyles through personalized training and support.",
          icon: "💪"
        },
        {
          title: "Excellence",
          description: "Providing top-notch equipment, expert trainers, and a supportive environment for optimal results.",
          icon: "⭐"
        },
        {
          title: "Community",
          description: "Building a strong fitness community where members motivate and support each other's journey.",
          icon: "👥"
        }
      ]
    },
    {
      title: "Our Values",
      cards: [
        {
          title: "Dedication",
          description: "Committed to helping every member reach their full potential through consistent support and guidance.",
          icon: "🎯"
        },
        {
          title: "Professionalism",
          description: "Maintaining high standards in our facilities, training programs, and member services.",
          icon: "👔"
        },
        {
          title: "Wellness",
          description: "Promoting holistic health through fitness, nutrition guidance, and mental well-being support.",
          icon: "🧘"
        }
      ]
    },
    {
      title: "Our Services",
      cards: [
        {
          title: "Personal Training",
          description: "One-on-one training sessions with certified professionals for personalized fitness programs.",
          icon: "🏋️"
        },
        {
          title: "Group Classes",
          description: "Dynamic group workouts including yoga, HIIT, strength training, and cardio sessions.",
          icon: "👥"
        },
        {
          title: "Fitness Assessment",
          description: "Comprehensive body composition analysis and fitness evaluations to track your progress.",
          icon: "📊"
        }
      ]
    }
  ];

  return (
    <div className="about-container">
      {cardGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="card-group">
          <h2 className="group-title">{group.title}</h2>
          <div className="cards-row">
            {group.cards.map((card, cardIndex) => (
              <div key={cardIndex} className="card">
                <div className="card-icon">{card.icon}</div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
