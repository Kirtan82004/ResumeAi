import React from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  
  // Check if there's enough data to display a preview
  const hasBasicInfo = resumeData.personalInfo.firstName || resumeData.personalInfo.lastName;
  
  if (!hasBasicInfo) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded p-4 text-center h-[400px] flex flex-col items-center justify-center">
        <p className="text-gray-500">Resume Preview</p>
        <p className="text-sm text-gray-400 mt-1">
          Fill out your information to see a preview of your resume
        </p>
      </div>
    );
  }
  
  // Render the selected template
  const renderTemplate = () => {
    switch(resumeData.template) {
      case 'modern':
        return <ModernTemplate />;
      case 'professional':
        return <ProfessionalTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      default:
        return <ModernTemplate />;
    }
  };
  
  return (
    <div className="border border-gray-200 rounded overflow-hidden bg-white">
      <div className="h-[400px] overflow-y-auto scale-75 origin-top">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;