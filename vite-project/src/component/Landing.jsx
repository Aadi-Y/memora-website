// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { 
    FiZap, FiCloud, FiUsers, FiLock, 
    FiBookOpen, FiBriefcase,
    FiTwitter, FiGithub, FiLinkedin 
} from 'react-icons/fi';
import "./Landing.css";
import { TfiRocket } from "react-icons/tfi";

// --- Data Configuration ---

const heroContent = {
  title: "Where Your Best Ideas Take Shape.",
  subtitle: "Memora is the calm, focused, and powerful notebook that transforms scattered thoughts into structured knowledge. Your digital second brain awaits.",
  primaryAction: { text: "Get Started - It's Free", to: "/signup" },
  secondaryAction: { text: "Login", to: "/login" },
};

const features = [
  {
    icon: FiZap,
    title: "Instant Capture",
    description: "Never lose a thought. Our streamlined editor lets you capture ideas at the speed of thought, without friction.",
  },
  {
    icon: FiCloud,
    title: "Seamless Sync",
    description: "Your knowledge base, always with you. Instantly synced and available across all your devices.",
  },
  {
    icon: FiUsers,
    title: "Fluid Collaboration",
    description: "Share your insights, not just your notes. Collaborate in real-time with your team on shared projects.",
  },
  {
    icon: FiLock,
    title: "Private by Design",
    description: "With end-to-end encryption, your data is yours alone. We can't read it, and neither can anyone else.",
  },
];

const useCases = [
    {
        icon: FiBookOpen,
        title: "For Students",
        description: "Turn chaotic lecture notes into a powerful, searchable study guide for exams."
    },
    {
        icon: FiBriefcase,
        title: "For Professionals",
        description: "Manage projects, document meetings, and build a reliable team knowledge base."
    },
    {
        icon: TfiRocket,
        title: "For Creatives",
        description: "A limitless canvas to brainstorm, collect inspiration, and nurture your next big idea."
    },
];

const testimonial = {
    quote: "Memora completely transformed my workflow. What used to be a chaotic mess of sticky notes and random files is now a structured, searchable second brain. It's an indispensable tool.",
    author: "Priya Sharma",
    title: "Lead Product Designer, InnovateCo",
};

const getStartedSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "A quick, free sign-up is all it takes to unlock your new workspace. No credit card required.",
    },
    {
      step: 2,
      title: "Jot Down Your First Note",
      description: "Experience our clean, distraction-free editor designed for focus and clarity.",
    },
    {
      step: 3,
      title: "Organize & Conquer",
      description: "Use tags, notebooks, and powerful search to build your personal knowledge empire.",
    },
];

// --- Child Components ---

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-card__icon"><Icon size={24} /></div>
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__description">{description}</p>
  </div>
);

const UseCaseCard = ({ icon: Icon, title, description }) => (
    <div className="use-case-card">
      <div className="use-case-card__icon"><Icon size={28} /></div>
      <h3 className="use-case-card__title">{title}</h3>
      <p className="use-case-card__description">{description}</p>
    </div>
);

// --- Main Landing Page Component ---

function Landing() {
  return (
    <div className="landing-page">
      <header className="landing__hero">
        <div className="container hero__container">
            <div className="hero__content">
                <h1 className="hero__title">{heroContent.title}</h1>
                <p className="hero__subtitle">{heroContent.subtitle}</p>
                <div className="hero__actions">
                    <Link to={heroContent.primaryAction.to} className="btn btn--primary btn--large">{heroContent.primaryAction.text}</Link>
                </div>
            </div>
            <div className="hero__graphic">
                 <svg width="100%" viewBox="0 0 498 498" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="249" cy="249" r="249" fill="url(#paint0_linear_101_2)"/>
                    <path d="M149 183.086C149 175.859 154.859 170 162.086 170H323.328C331.096 170 337.328 176.232 337.328 184V333C337.328 340.768 331.096 347 323.328 347H162.086C154.859 347 149 341.141 149 333.914V183.086Z" fill="white" stroke="#E0E0E0" strokeWidth="2"/>
                    <rect x="175" y="196" width="148" height="8" rx="4" fill="#F0F0F0"/>
                    <rect x="175" y="218" width="98" height="8" rx="4" fill="#F0F0F0"/>
                    <rect x="175" y="258" width="148" height="6" rx="3" fill="#F7F7FC"/>
                    <rect x="175" y="274" width="148" height="6" rx="3" fill="#F7F7FC"/>
                    <rect x="175" y="290" width="128" height="6" rx="3" fill="#F7F7FC"/>
                    <rect x="290" y="322" width="34" height="12" rx="6" fill="#4A47A3"/>
                    <defs>
                        <linearGradient id="paint0_linear_101_2" x1="0" y1="0" x2="498" y2="498" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F7F7FC"/>
                        <stop offset="1" stopColor="#F0F0F0"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
      </header>

      <main className="landing__main">
        <section className="landing__section">
          <div className="container">
            <h2 className="section__title">A Smarter Way to Organize Your Knowledge</h2>
            <p className="section__subtitle">Memora isn't just a place to write things down. It's a system designed for clarity.</p>
            <div className="features-grid">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section className="landing__section landing__section--highlight">
          <div className="container">
            <div className="testimonial-card">
                <p className="testimonial__quote">"{testimonial.quote}"</p>
                <div className="testimonial__author">
                    <span className="testimonial__author-name">{testimonial.author}</span>
                    <span className="testimonial__author-title">{testimonial.title}</span>
                </div>
            </div>
          </div>
        </section>

        <section className="landing__section">
            <div className="container">
                <h2 className="section__title">Perfect For...</h2>
                <div className="use-cases-grid">
                    {useCases.map((useCase, index) => (
                        <UseCaseCard key={index} {...useCase} />
                    ))}
                </div>
            </div>
        </section>

        <section className="landing__section landing__section--highlight">
          <div className="container">
            <h2 className="section__title">Get Started in Less Than a Minute</h2>
            <div className="steps-container">
              {getStartedSteps.map((step) => (
                <div key={step.step} className="step">
                  <div className="step__number">{step.step}</div>
                  <div className="step__content">
                    <h3 className="step__title">{step.title}</h3>
                    <p className="step__description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="landing__section landing__cta">
            <div className="container">
                <h2 className="cta__title">Unlock Your Potential Today</h2>
                <p className="cta__subtitle">Join thousands of organized minds who use Memora to capture, structure, and recall their best ideas.</p>
                <Link to="/signup" className="btn btn--primary btn--large">Claim Your Free Account</Link>
            </div>
        </section>
      </main>

      <footer className="landing__footer">
        <div className="container footer__container">
            <p>© {new Date().getFullYear()} Memora. A thoughtful tool for modern thinkers.</p>
            <div className="footer__socials">
                <a href="#" aria-label="Twitter"><FiTwitter /></a>
                <a href="#" aria-label="GitHub"><FiGithub /></a>
                <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;