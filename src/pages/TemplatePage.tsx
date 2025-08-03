
import React, { useState } from 'react';
import CreativeTemplate from '../components/resume/templates/CreativeTemplate';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import ProfessionalTemplate from '../components/resume/templates/ProfessionalTemplate';

const TemplatePage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<'creative' | 'modern' | 'professional'>('creative');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Template Switcher */}
      <div className="mb-6 flex justify-center gap-4">
        <button
          className={`px-4 py-2 rounded ${
            selectedTemplate === 'creative' ? 'bg-blue-700 text-white' : 'bg-white border'
          }`}
          onClick={() => setSelectedTemplate('creative')}
        >
          Creative
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTemplate === 'modern' ? 'bg-blue-700 text-white' : 'bg-white border'
          }`}
          onClick={() => setSelectedTemplate('modern')}
        >
          Modern
        </button>
        <button
          className={`px-4 py-2 rounded ${
            selectedTemplate === 'professional' ? 'bg-blue-700 text-white' : 'bg-white border'
          }`}
          onClick={() => setSelectedTemplate('professional')}
        >
          Professional
        </button>
      </div>

      {/* Template Preview */}
      <div className="bg-white shadow-lg max-w-[900px] mx-auto border border-gray-200">
        {selectedTemplate === 'creative' && <CreativeTemplate />}
        {selectedTemplate === 'modern' && <ModernTemplate />}
        {selectedTemplate === 'professional' && <ProfessionalTemplate />}
      </div>
    </div>
  );
};

export default TemplatePage;
