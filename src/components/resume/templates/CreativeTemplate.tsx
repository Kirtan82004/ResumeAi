import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const CreativeTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="bg-white w-full min-h-[1056px] text-gray-800 shadow-sm flex">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-800 text-white p-6">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-1">
            {personalInfo.firstName} <br /> {personalInfo.lastName}
          </h1>
          <h2 className="text-lg text-blue-200">{personalInfo.title}</h2>
        </div>
        
        <div className="space-y-4 mb-6">
          {personalInfo.email && (
            <div>
              <h3 className="text-sm font-semibold text-blue-200 mb-1">EMAIL</h3>
              <p className="text-sm">{personalInfo.email}</p>
            </div>
          )}
          
          {personalInfo.phone && (
            <div>
              <h3 className="text-sm font-semibold text-blue-200 mb-1">PHONE</h3>
              <p className="text-sm">{personalInfo.phone}</p>
            </div>
          )}
          
          {personalInfo.location && (
            <div>
              <h3 className="text-sm font-semibold text-blue-200 mb-1">LOCATION</h3>
              <p className="text-sm">{personalInfo.location}</p>
            </div>
          )}
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold text-white mb-3 border-b border-blue-700 pb-1">
              SKILLS
            </h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{skill.name}</span>
                    <span className="text-xs text-blue-200">
                      {skill.level === 1 && 'BEGINNER'}
                      {skill.level === 2 && 'INTERMEDIATE'}
                      {skill.level === 3 && 'PROFICIENT'}
                      {skill.level === 4 && 'ADVANCED'}
                      {skill.level === 5 && 'EXPERT'}
                    </span>
                  </div>
                  <div className="w-full bg-blue-900 h-1.5 rounded-full">
                    <div 
                      className="bg-blue-400 h-1.5 rounded-full" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="w-2/3 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
              PROFILE
            </h3>
            <p className="text-gray-700">{personalInfo.summary}</p>
          </section>
        )}
        
        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <h3 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
              EXPERIENCE
            </h3>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-[5px]"></div>
                  <h4 className="font-bold text-gray-900">{exp.position}</h4>
                  <p className="text-blue-600 text-sm mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-xs mb-2">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        
        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-blue-800 mb-3 border-b border-gray-200 pb-1">
              EDUCATION
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-200">
                  <div className="absolute left-0 top-1.5 w-2 h-2 bg-blue-500 rounded-full transform -translate-x-[5px]"></div>
                  <h4 className="font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="text-blue-600 text-sm mb-1">{edu.institution}</p>
                  <p className="text-gray-500 text-xs mb-2">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-gray-600 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;