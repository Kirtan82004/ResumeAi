import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ResumeAI</h3>
            <p className="text-gray-300 text-sm">
              Build professional resumes with AI-powered suggestions and templates.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Home</a></li>
              <li><a href="/resume" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Build Resume</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Templates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              Have questions or feedback? <br />
              <a href="mailto:info@resumeai.com" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">info@resumeai.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;