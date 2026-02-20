import React from "react";
import { Link } from "react-router-dom";
import {
  FiZap, FiCloud, FiUsers, FiLock,
  FiBookOpen, FiBriefcase,
  FiTwitter, FiGithub, FiLinkedin,
  FiArrowRight, FiCheck, FiEdit3, FiSearch, FiTag
} from "react-icons/fi";
import "./Landing.css";
import { TfiRocket } from "react-icons/tfi";
import NavText from "./NavText";

// --- Data ---

const heroContent = {
  title: "Where Your Best Ideas Take Shape.",
  subtitle:
    "Memora is the calm, focused, and powerful notebook that transforms scattered thoughts into structured knowledge. Your digital second brain awaits.",
  primaryAction: { text: "Get Started — It's Free", to: "/signup" },
};

const features = [
  {
    icon: FiZap,
    title: "Instant Capture",
    description:
      "Never lose a thought. Our streamlined editor lets you capture ideas at the speed of thought, without friction.",
  },
  {
    icon: FiCloud,
    title: "Seamless Sync",
    description:
      "Your knowledge base, always with you. Instantly synced and available across all your devices.",
  },
  {
    icon: FiUsers,
    title: "Fluid Collaboration",
    description:
      "Share your insights, not just your notes. Collaborate in real-time with your team on shared projects.",
  },
  {
    icon: FiLock,
    title: "Private by Design",
    description:
      "With end-to-end encryption, your data is yours alone. We can't read it, and neither can anyone else.",
  },
];

const useCases = [
  {
    icon: FiBookOpen,
    title: "For Students",
    description:
      "Turn chaotic lecture notes into a powerful, searchable study guide for exams.",
  },
  {
    icon: FiBriefcase,
    title: "For Professionals",
    description:
      "Manage projects, document meetings, and build a reliable team knowledge base.",
  },
  {
    icon: TfiRocket,
    title: "For Creatives",
    description:
      "A limitless canvas to brainstorm, collect inspiration, and nurture your next big idea.",
  },
];

const testimonial = {
  quote:
    "Memora completely transformed my workflow. What used to be a chaotic mess of sticky notes and random files is now a structured, searchable second brain. It's an indispensable tool.",
  author: "Priya Sharma",
  title: "Lead Product Designer, InnovateCo",
};

const getStartedSteps = [
  {
    step: 1,
    title: "Create Your Account",
    description:
      "A quick, free sign-up is all it takes to unlock your new workspace. No credit card required.",
  },
  {
    step: 2,
    title: "Jot Down Your First Note",
    description:
      "Experience our clean, distraction-free editor designed for focus and clarity.",
  },
  {
    step: 3,
    title: "Organize & Conquer",
    description:
      "Use tags, notebooks, and powerful search to build your personal knowledge empire.",
  },
];

// --- Child Components ---

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-card__icon">
      <Icon size={24} />
    </div>
    <h3 className="feature-card__title">{title}</h3>
    <p className="feature-card__description">{description}</p>
  </div>
);

const UseCaseCard = ({ icon: Icon, title, description }) => (
  <div className="use-case-card">
    <div className="use-case-card__icon">
      <Icon size={28} />
    </div>
    <h3 className="use-case-card__title">{title}</h3>
    <p className="use-case-card__description">{description}</p>
  </div>
);

/* Miniature note card for the hero graphic */
const MiniNote = ({ title, tags, pinned, className = "" }) => (
  <div className={`mini-note ${pinned ? "mini-note--pinned" : ""} ${className}`}>
    <div className="mini-note__header">
      <span className="mini-note__title">{title}</span>
      {pinned && <span className="mini-note__pin">&#x1F4CC;</span>}
    </div>
    <div className="mini-note__lines">
      <span /><span /><span />
    </div>
    <div className="mini-note__tags">
      {tags.map((t, i) => (
        <span key={i} className="mini-note__tag">#{t}</span>
      ))}
    </div>
  </div>
);

// --- Main Component ---

function Landing() {
  return (
    <div className="landing-page">
      <NavText />

      {/* ── Hero ── */}
      <header className="landing__hero">
        <div className="container hero__container">
          <div className="hero__content">
            <span className="hero__badge"><FiEdit3 size={14} /> Note-taking, reimagined</span>
            <h1 className="hero__title">{heroContent.title}</h1>
            <p className="hero__subtitle">{heroContent.subtitle}</p>
            <div className="hero__actions">
              <Link to={heroContent.primaryAction.to} className="btn btn--primary btn--large get-started">
                {heroContent.primaryAction.text}
                <FiArrowRight className="btn__icon" />
              </Link>
              <Link to="/login" className="btn btn--ghost btn--large">
                Log in
              </Link>
            </div>
            <div className="hero__proof">
              <div className="hero__avatars">
                <span className="hero__avatar">P</span>
                <span className="hero__avatar">A</span>
                <span className="hero__avatar">R</span>
              </div>
              <span className="hero__proof-text">Join 2,000+ organized minds</span>
            </div>
          </div>

          {/* Interactive hero graphic — mini dashboard preview */}
          <div className="hero__graphic">
            <div className="hero__dashboard-preview">
              {/* Fake top bar */}
              <div className="preview__topbar">
                <div className="preview__brand"><FiBookOpen size={14} /> Memora</div>
                <div className="preview__search"><FiSearch size={12} /><span>Search notes...</span></div>
                <div className="preview__avatar">P</div>
              </div>
              {/* Fake note cards */}
              <div className="preview__grid">
                <MiniNote title="Project Ideas" tags={["work", "ideas"]} pinned className="mini-note--1" />
                <MiniNote title="Weekly Goals" tags={["personal"]} pinned={false} className="mini-note--2" />
                <MiniNote title="Reading List" tags={["books", "learning"]} pinned={false} className="mini-note--3" />
              </div>
              {/* Fake FAB */}
              <div className="preview__fab">+</div>
            </div>
          </div>
        </div>
      </header>

      <main className="landing__main">
        {/* ── Features ── */}
        <section className="landing__section">
          <div className="container">
            <span className="section__badge">Features</span>
            <h2 className="section__title">A Smarter Way to Organize Your Knowledge</h2>
            <p className="section__subtitle">
              Memora isn't just a place to write things down. It's a system designed for clarity.
            </p>
            <div className="features-grid">
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section className="landing__section landing__section--highlight">
          <div className="container">
            <div className="testimonial-card">
              <p className="testimonial__quote">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="testimonial__author">
                <div className="testimonial__avatar">{testimonial.author[0]}</div>
                <div>
                  <span className="testimonial__author-name">{testimonial.author}</span>
                  <span className="testimonial__author-title">{testimonial.title}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Use Cases ── */}
        <section className="landing__section">
          <div className="container">
            <span className="section__badge">Use Cases</span>
            <h2 className="section__title">Perfect For...</h2>
            <div className="use-cases-grid">
              {useCases.map((uc, i) => (
                <UseCaseCard key={i} {...uc} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Steps ── */}
        <section className="landing__section landing__section--highlight">
          <div className="container">
            <span className="section__badge">How it works</span>
            <h2 className="section__title">Get Started in Less Than a Minute</h2>
            <div className="steps-container">
              {getStartedSteps.map((s) => (
                <div key={s.step} className="step">
                  <div className="step__number">
                    <FiCheck size={18} />
                  </div>
                  <div className="step__content">
                    <h3 className="step__title">{s.title}</h3>
                    <p className="step__description">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="landing__section landing__cta">
          <div className="container">
            <h2 className="cta__title">Unlock Your Potential Today</h2>
            <p className="cta__subtitle">
              Join thousands of organized minds who use Memora to capture, structure, and recall their best ideas.
            </p>
            <Link to="/signup" className="btn btn--primary btn--large">
              Claim Your Free Account <FiArrowRight className="btn__icon" />
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="landing__footer">
        <div className="container footer__container">
          <div className="footer__brand">
            <FiBookOpen className="footer__brand-icon" />
            <span>Memora</span>
          </div>
          <p className="footer__copy">&copy; {new Date().getFullYear()} Memora. A thoughtful tool for modern thinkers.</p>
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