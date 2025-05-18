import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

const TemplateSelection: React.FC = () => {
  const { resumeData, updateTemplate } = useResume();
  
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimalist design with a contemporary look.',
      thumbnail: 'https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional layout suited for corporate environments.',
      thumbnail: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design that stands out, ideal for creative fields.',
      thumbnail: 'https://images.pexels.com/photos/8867426/pexels-photo-8867426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Choose a Template</h2>
      <p className="text-gray-600">
        Select a professional template that best showcases your experience.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {templates.map((template) => {
          const isSelected = resumeData.template === template.id;
          
          return (
            <div 
              key={template.id}
              className={`
                border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md
                ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 hover:border-gray-300'}
              `}
              onClick={() => updateTemplate(template.id as any)}
            >
              <div className="relative">
                <img
                  src={template.thumbnail}
                  alt={`${template.name} template preview`}
                  className="w-full h-48 object-cover"
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">
                  {template.name}
                  {isSelected && <span className="ml-2 text-blue-500 text-sm">(Selected)</span>}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {template.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6">
        <h3 className="text-sm font-medium text-blue-800">ATS Compatibility</h3>
        <p className="text-sm text-blue-700 mt-1">
          All our templates are designed to be ATS (Applicant Tracking System) friendly, 
          ensuring your resume gets past automated screening systems used by employers.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelection;