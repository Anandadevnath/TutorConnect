import React, { useEffect, useState } from 'react';

function Footer() {
  const [isLight, setIsLight] = useState(() => {
    return document.documentElement.getAttribute('data-theme') === 'light';
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={isLight ? "bg-gray-200 text-black py-10 mt-12" : "bg-[#1e293b] text-white py-10 mt-12"}>
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl w-10 h-10 flex items-center justify-center mr-2">
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="6" fill="#fff" fillOpacity="0.1"/>
                  <path d="M8 8h8v8H8z" fill="#fff" fillOpacity="0.2"/>
                  <rect x="7" y="7" width="10" height="10" rx="2" stroke="#fff" strokeWidth="2"/>
                </svg>
              </div>
              <span className={isLight ? "text-2xl font-bold text-black" : "text-2xl font-bold text-white"}>
                Tutor<span className="text-cyan-400">Connect</span>
              </span>
            </div>
            <p className={isLight ? "text-gray-600 mb-4" : "text-gray-300 mb-4"}>
              Connecting learners with expert tutors worldwide. Learn languages and subjects in a friendly, supportive atmosphere.
            </p>
            <div className="flex space-x-4 text-2xl mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className={isLight ? "text-lg font-bold mb-4 text-black" : "text-lg font-bold mb-4"}>Quick Links</h3>
            <ul className={isLight ? "space-y-2 text-gray-600" : "space-y-2 text-gray-300"}>
              <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
              <li><a href="/findtutor" className="hover:text-cyan-400 transition">Find Tutors</a></li>
              <li><a href="/addtutor" className="hover:text-cyan-400 transition">Become a Tutor</a></li>
              <li><a href="/about" className="hover:text-cyan-400 transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>
          {/* Popular Languages */}
          <div>
            <h3 className={isLight ? "text-lg font-bold mb-4 text-black" : "text-lg font-bold mb-4"}>Popular Languages</h3>
            <ul className={isLight ? "space-y-2 text-gray-600" : "space-y-2 text-gray-300"}>
              <li>English</li>
              <li>Spanish</li>
              <li>French</li>
              <li>German</li>
              <li>Chinese</li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className={isLight ? "text-lg font-bold mb-4 text-black" : "text-lg font-bold mb-4"}>Contact Info</h3>
            <ul className={isLight ? "space-y-3 text-gray-600" : "space-y-3 text-gray-300"}>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-cyan-400"></i>
                <span>support@tutorconnect.com</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-cyan-400"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-cyan-400"></i>
                <span>123 Education St, Learning City</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={isLight ? "border-t border-gray-300 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm" : "border-t border-gray-700 mt-10 pt-4 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm"}>
          <p className="mb-2 md:mb-0">&copy; {new Date().getFullYear()} TutorConnect. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-cyan-400 transition">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-cyan-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;