import React from 'react';
import { useResume } from '../../../context/ResumeContext';

const ProfessionalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="bg-white w-full min-h-[1056px] p-8 text-gray-800 shadow-sm">
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2 border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900 uppercase mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-lg text-gray-600 mb-3">{personalInfo.title}</h2>
        
        <div className="flex justify-center gap-x-4 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-base font-bold text-gray-900 uppercase mb-2">
            Professional Summary
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-base font-bold text-gray-900 uppercase mb-3">
            Professional Experience
          </h3>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-gray-900">{exp.company}</h4>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 italic mb-2">{exp.position}</p>
                {exp.description && (
                  <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-outside text-sm text-gray-700 pl-5 space-y-1">
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
        <section className="mb-6">
          <h3 className="text-base font-bold text-gray-900 uppercase mb-3">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="font-bold text-gray-900">
                    {edu.institution}
                  </h4>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700 italic">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </p>
                {edu.description && (
                  <p className="text-gray-600 text-sm mt-1">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-base font-bold text-gray-900 uppercase mb-3">
            Skills
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center">
                <span className="text-gray-800">{skill.name}</span>
                <div className="ml-2 flex-grow max-w-24">
                  <div className="w-full bg-gray-200 h-1.5 rounded-full">
                    <div 
                      className="bg-gray-800 h-1.5 rounded-full" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;