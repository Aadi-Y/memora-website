import React from "react";
import "./Landing.css"
import {Link} from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="landing-container">
        <div className="landing-header">
          <h1>Welcome to Memora</h1>
          <h1>Your Ultimate Note-Taking Companion!</h1>
          <p>Organize, Access, and Share Your Notes Effortlessly</p>
          <div className="landing-controls">
            <button><Link to="/signup">Signup</Link></button>
            <button><Link to="/login">Login</Link></button>
          </div>
        </div>
        <div className="landing-main">
            <p>Are you tired of losing track of your ideas, meeting notes, or study materials? Say goodbye to scattered sticky notes and messy notebooks! <span>Memora</span> is here to revolutionize the way you take, organize, and access your notes.</p>

            <div className="landing-purpose">
                <h2>Why Choose Memora?</h2>
                <h3>✨ Seamless Organization</h3>
                <p>Categorize your notes with tags, folders, and customizable labels. Find what you need in seconds with our powerful search feature.</p>

                <h3>📱 Access Anywhere, Anytime</h3>
                <p>Your notes are synced across all your devices – desktop, tablet, or mobile. Never miss a beat, whether you're at home, in class, or on the go.</p>

                <h3>🤝 Collaborate with Ease</h3>
                <p>Share notes with classmates, colleagues, or friends. Work together in real-time and make collaboration simple and efficient.</p>

                <h3>🔒 Keep Your Notes Secure</h3>
                <p>Your data is safe with us. Enjoy end-to-end encryption and privacy controls to protect your most important ideas.</p>

                <h3>🎨 Customizable and User-Friendly</h3>
                <p>Personalize your note-taking experience with themes, fonts, and layouts that suit your style. Our intuitive design makes it easy for anyone to get started.</p>
            </div>

            <div className="landing-perfect-for">
                <h2>Perfect For:</h2>
                <ul>
                    <li>Students: Keep your lecture notes, study guides, and assignments organized in one place.</li>
                    <li>Professionals: Jot down meeting notes, project ideas, and to-do lists with ease.</li>
                    <li>Creatives: Capture inspiration, brainstorm ideas, and draft your next big project.</li>
                    <li>Everyone: Whether you're planning a trip, managing a household, or just love staying organized, <span>Memora</span> has you covered.</li>
                </ul>
            </div>

            <div className="landing-get-started">
                <h2>Get Started in 3 Easy Steps:</h2>
                <ol>
                    <li>Sign Up for Free</li>
                    <p>Create your account in seconds – no credit card required.</p>

                    <li>Start Taking Notes</li>
                    <p>Use our simple editor to write, format, and organize your notes.</p>

                    <li>Stay Productive</li>
                    <p>Access your notes anytime, anywhere, and share them with anyone.</p>
                </ol>
            </div>
        </div>

        <footer>
            <h2>© 2025 Memora. All rights reserved.</h2>
        </footer>
      </div>
    </>
  );
}

export default Landing;
