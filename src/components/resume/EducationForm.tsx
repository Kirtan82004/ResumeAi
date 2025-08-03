import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Education } from '../../types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, removeEducation } = useResume();
  
  const [newEducation, setNewEducation] = useState<Education>({
    id: '',
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setNewEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleAddEducation = () => {
    const id = Date.now().toString();
    addEducation({ ...newEducation, id });
    
    // Reset form
    setNewEducation({
      id: '',
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Education</h2>
      
      {resumeData.education.length > 0 && (
        <div className="space-y-6">
          {resumeData.education.map((education) => (
            <div key={education.id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">
                    {education.degree} {education.field && `in ${education.field}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {education.institution} | {education.startDate} - {education.current ? 'Present' : education.endDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              
              {education.description && (
                <p className="mt-2 text-sm text-gray-700">{education.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Add New Education</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
              Institution
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={newEducation.institution}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={newEducation.degree}
              onChange={handleChange}
              placeholder="e.g., Bachelor of Science, Certificate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="field" className="block text-sm font-medium text-gray-700">
            Field of Study
          </label>
          <input
            type="text"
            id="field"
            name="field"
            value={newEducation.field}
            onChange={handleChange}
            placeholder="e.g., Computer Science, Business Administration"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
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
              value={newEducation.startDate}
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
                value={newEducation.endDate}
                onChange={handleChange}
                disabled={newEducation.current}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                id="current"
                name="current"
                checked={newEducation.current}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                I'm currently studying here
              </label>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            value={newEducation.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Notable achievements, activities, GPA, etc."
          />
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddEducation}
            disabled={!newEducation.institution || !newEducation.degree || !newEducation.startDate || (!newEducation.endDate && !newEducation.current)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;