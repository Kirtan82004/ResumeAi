import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Skill } from '../../types/resume';
import { PlusCircle, Trash2 } from 'lucide-react';
import { SuggestButton } from './SuggestButton';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, removeSkill } = useResume();
  const { skills, personalInfo, experiences } = resumeData;
  
  const [newSkill, setNewSkill] = useState<Skill>({
    id: '',
    name: '',
    level: 3
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setNewSkill(prev => ({
      ...prev,
      [name]: type === 'range' ? parseInt(value) : value
    }));
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    
    const id = Date.now().toString();
    addSkill({ ...newSkill, id });
    
    // Reset form
    setNewSkill({
      id: '',
      name: '',
      level: 3
    });
  };
  
  const suggestSkills = () => {
    // Simulate AI suggestion based on job title and experience
    const title = personalInfo.title.toLowerCase();
    const allExperienceText = experiences.map(exp => 
      `${exp.position} ${exp.description} ${exp.achievements.join(' ')}`
    ).join(' ').toLowerCase();
    
    const skillSuggestions: {[key: string]: string[]} = {
      'software': ['JavaScript', 'React', 'Node.js', 'TypeScript', 'REST API', 'Git', 'SQL', 'Problem Solving'],
      'web': ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX', 'Web Performance', 'SEO'],
      'data': ['Python', 'SQL', 'Data Analysis', 'Statistical Modeling', 'Data Visualization', 'Machine Learning'],
      'product': ['Product Strategy', 'User Research', 'Agile Methodologies', 'Market Analysis', 'Roadmapping', 'A/B Testing'],
      'marketing': ['Content Marketing', 'SEO', 'Social Media', 'Analytics', 'Email Marketing', 'Campaign Management'],
      'design': ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Wireframing', 'Prototyping', 'Design Thinking'],
      'manager': ['Team Leadership', 'Project Management', 'Strategic Planning', 'Performance Reviews', 'Mentoring']
    };
    
    // Find matching skill categories based on title and experience
    let suggestedSkills: string[] = [];
    
    for (const [category, categorySkills] of Object.entries(skillSuggestions)) {
      if (title.includes(category) || allExperienceText.includes(category)) {
        suggestedSkills = [...suggestedSkills, ...categorySkills];
      }
    }
    
    // If no matches, provide general professional skills
    if (suggestedSkills.length === 0) {
      suggestedSkills = [
        'Communication', 'Problem Solving', 'Time Management', 'Teamwork',
        'Microsoft Office', 'Research', 'Critical Thinking', 'Adaptability'
      ];
    }
    
    // Filter out skills that are already added
    const existingSkillNames = skills.map(s => s.name.toLowerCase());
    const newSuggestions = suggestedSkills.filter(
      skill => !existingSkillNames.includes(skill.toLowerCase())
    );
    
    // Add up to 5 suggested skills
    const skillsToAdd = newSuggestions.slice(0, 5);
    
    skillsToAdd.forEach(skillName => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
      addSkill({
        id,
        name: skillName,
        level: 3 + Math.floor(Math.random() * 3) // Random level between 3-5
      });
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
        <SuggestButton 
          onClick={suggestSkills} 
          disabled={!personalInfo.title && experiences.length === 0}
        />
      </div>
      
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white p-3 rounded-md border border-gray-200 flex justify-between items-center">
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-xs text-gray-500">
                    {skill.level === 1 && 'Beginner'}
                    {skill.level === 2 && 'Intermediate'}
                    {skill.level === 3 && 'Proficient'}
                    {skill.level === 4 && 'Advanced'}
                    {skill.level === 5 && 'Expert'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="ml-3 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-gray-500">No skills added yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Click "Suggest Skills" or add skills manually below.
          </p>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-md border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-4">Add New Skill</h3>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newSkill.name}
            onChange={handleChange}
            placeholder="e.g., JavaScript, Project Management, Photoshop"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="level" className="block text-sm font-medium text-gray-700">
            Proficiency Level: {' '}
            <span className="text-gray-600">
              {newSkill.level === 1 && 'Beginner'}
              {newSkill.level === 2 && 'Intermediate'}
              {newSkill.level === 3 && 'Proficient'}
              {newSkill.level === 4 && 'Advanced'}
              {newSkill.level === 5 && 'Expert'}
            </span>
          </label>
          <input
            type="range"
            id="level"
            name="level"
            min="1"
            max="5"
            value={newSkill.level}
            onChange={handleChange}
            className="mt-1 block w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
        
        <div className="mt-4">
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Skill
          </button>
        </div>
      </div>
      
      {!personalInfo.title && experiences.length === 0 && (
        <p className="text-sm text-amber-600">
          Add job title or work experience to enable AI skill suggestions
        </p>
      )}
    </div>
  );
};

export default SkillsForm;