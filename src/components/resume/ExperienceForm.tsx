import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Experience } from '../../types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SuggestButton } from './SuggestButton';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  
  const [newExperience, setNewExperience] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: []
  });
  
  const [newAchievement, setNewAchievement] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setNewExperience(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleAddExperience = () => {
    const id = Date.now().toString();
    addExperience({ ...newExperience, id });
    
    // Reset form
    setNewExperience({
      id: '',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    });
    setNewAchievement('');
  };
  
  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }));
      setNewAchievement('');
    }
  };
  
  const handleRemoveAchievement = (index: number) => {
    setNewExperience(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };
  
  const handleRemoveExistingAchievement = (experienceId: string, index: number) => {
    const experience = resumeData.experiences.find(exp => exp.id === experienceId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements.splice(index, 1);
      updateExperience(experienceId, { achievements: newAchievements });
    }
  };
  
  const suggestAchievements = () => {
    // Simulate AI suggestion based on position and company
    if (!newExperience.position) return;
    
    const positionLower = newExperience.position.toLowerCase();
    let suggestions: string[] = [];
    
    if (positionLower.includes('developer') || positionLower.includes('engineer')) {
      suggestions = [
        'Developed and maintained key features for the company\'s flagship product, improving performance by 35%',
        'Led the migration from legacy systems to modern architecture, reducing technical debt by 40%',
        'Implemented automated testing that reduced bugs in production by 27%',
        'Optimized database queries resulting in a 50% reduction in page load times'
      ];
    } else if (positionLower.includes('manager') || positionLower.includes('lead')) {
      suggestions = [
        'Led a team of 8 professionals, achieving 125% of department targets',
        'Implemented new project management methodology that increased team productivity by 30%',
        'Reduced department expenses by 15% while increasing output quality',
        'Successfully launched 5 major projects ahead of schedule and under budget'
      ];
    } else if (positionLower.includes('design')) {
      suggestions = [
        'Redesigned the company website, increasing user engagement by 45%',
        'Created consistent design system that reduced design time by 30%',
        'Conducted user research that led to 25% improvement in customer satisfaction',
        'Designed mobile app interface that received award for excellence in UX'
      ];
    } else {
      suggestions = [
        'Exceeded performance targets by an average of 18% each quarter',
        'Streamlined processes that saved the company approximately 20 hours per week',
        'Recognized with employee excellence award for outstanding contributions',
        'Successfully managed multiple high-priority projects simultaneously'
      ];
    }
    
    // Only add suggestions that aren't already in the achievements list
    const newSuggestions = suggestions.filter(
      suggestion => !newExperience.achievements.includes(suggestion)
    );
    
    if (newSuggestions.length > 0) {
      setNewExperience(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newSuggestions.slice(0, 2)]
      }));
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
      
      {resumeData.experiences.length > 0 && (
        <div className="space-y-6">
          {resumeData.experiences.map((experience) => (
            <div key={experience.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{experience.position}</h3>
                  <p className="text-sm text-gray-600">
                    {experience.company} | {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeExperience(experience.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              {experience.description && (
                <p className="mt-2 text-sm text-gray-700">{experience.description}</p>
              )}
              
              {experience.achievements.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700">Key Achievements:</p>
                  <ul className="mt-1 space-y-1">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="mr-2">•</span>
                        <span className="flex-grow">{achievement}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingAchievement(experience.id, index)}
                          className="ml-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Add New Experience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={newExperience.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={newExperience.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="month"
              id="startDate"
              name="startDate"
              value={newExperience.startDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <div className="flex items-center mt-1">
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={newExperience.endDate}
                onChange={handleChange}
                disabled={newExperience.current}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={newExperience.current}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            value={newExperience.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Brief description of your role and responsibilities"
          />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Key Achievements
            </label>
            <SuggestButton 
              onClick={suggestAchievements} 
              disabled={!newExperience.position}
            />
          </div>
          
          {newExperience.achievements.length > 0 && (
            <ul className="mt-2 space-y-1 mb-3">
              {newExperience.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start text-sm">
                  <span className="mr-2">•</span>
                  <span className="flex-grow">{achievement}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          <div className="flex mt-2">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add an achievement..."
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleAddAchievement}
              disabled={!newAchievement.trim()}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              Add
            </button>
          </div>
          
          {!newExperience.position && newExperience.achievements.length === 0 && (
            <p className="mt-1 text-sm text-amber-600">
              Enter a position to enable AI suggestions for achievements
            </p>
          )}
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddExperience}
            disabled={!newExperience.company || !newExperience.position || !newExperience.startDate || (!newExperience.endDate && !newExperience.current)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;