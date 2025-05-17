import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { SuggestButton } from './SuggestButton';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const suggestSummary = () => {
    // Simulate AI suggestion based on title and other fields
    const titles = {
      'software engineer': 'Passionate Software Engineer with expertise in building scalable web applications. Experienced in full-stack development with a focus on JavaScript frameworks and cloud technologies. Committed to writing clean, maintainable code and delivering high-quality solutions.',
      'product manager': 'Results-driven Product Manager with a proven track record of developing innovative products from concept to launch. Skilled in agile methodologies, user research, and cross-functional team leadership. Passionate about creating user-centered solutions that drive business growth.',
      'marketing specialist': 'Creative Marketing Specialist with expertise in digital marketing campaigns and brand development. Skilled in social media strategy, content creation, and analytics. Passionate about leveraging data-driven insights to optimize marketing performance and drive customer engagement.',
      'data scientist': 'Analytical Data Scientist with expertise in machine learning, statistical analysis, and data visualization. Experienced in extracting meaningful insights from complex datasets to drive business decisions. Passionate about solving challenging problems using advanced analytical techniques.',
    };

    const defaultSummary = 'Dedicated professional with a strong work ethic and commitment to excellence. Skilled in collaboration, problem-solving, and adapting to new challenges. Seeking to leverage my skills and experience to contribute to organizational success.';

    // Check if the current title matches any of our templates
    const lowerTitle = personalInfo.title.toLowerCase();
    let suggestedSummary = defaultSummary;

    for (const [key, summary] of Object.entries(titles)) {
      if (lowerTitle.includes(key)) {
        suggestedSummary = summary;
        break;
      }
    }

    updatePersonalInfo({ summary: suggestedSummary });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Professional Title*
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="e.g., Software Engineer, Product Manager"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="e.g., San Francisco, CA"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Professional Summary
          </label>
          <SuggestButton onClick={suggestSummary} disabled={!personalInfo.title} />
        </div>
        <textarea
          id="summary"
          name="summary"
          rows={4}
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Write a short summary of your professional background and goals..."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {!personalInfo.title && (
          <p className="mt-1 text-sm text-amber-600">
            Enter a job title to enable AI suggestions
          </p>
        )}
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        * Required fields
      </p>
    </div>
  );
};

export default PersonalInfoForm;