import React from 'react';
import { useResume } from '../../../context/ResumeContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const ModernTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, experiences, education, skills } = resumeData;
  
  return (
    <div className="bg-white w-full min-h-[1056px] p-8 text-gray-800 shadow-sm">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <h2 className="text-xl text-blue-600 mb-3">{personalInfo.title}</h2>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
            Summary
          </h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Experience
          </h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">{exp.company}</p>
                {exp.description && (
                  <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                )}
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
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
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;