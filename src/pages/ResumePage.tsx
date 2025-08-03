// ResumePage.tsx
import React, { useState, useRef } from 'react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/Tabs';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import TemplateSelection from '../components/resume/TemplateSelection';
import ResumePreview from '../components/resume/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Create Your Resume - Resume AI</title>
  <meta name="description" content="Use AI to generate job-winning resumes instantly. Just fill in your details and download your resume in seconds." />
  <link rel="canonical" href="https://resume-ai-indol.vercel.app/resume" />
</Helmet>

const ResumePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { resumeData } = useResume();
  const resumeRef = useRef<HTMLDivElement>(null);

  const isPersonalInfoComplete = () => {
    const { firstName, lastName, email, title } = resumeData.personalInfo;
    return firstName && lastName && email && title;
  };

  const getCompletionPercentage = () => {
    let points = 0;
    let total = 4;
    if (isPersonalInfoComplete()) points += 1;
    if (resumeData.experiences.length > 0) points += 1;
    if (resumeData.education.length > 0) points += 1;
    if (resumeData.skills.length > 0) points += 1;
    return Math.floor((points / total) * 100);
  };

  const downloadPDF = () => {
    if (resumeRef.current) {
      const opt = {
        margin: 0.5,
        filename: 'My_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      html2pdf().set(opt).from(resumeRef.current).save();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Build Your Resume</h1>
        <p className="mt-2 text-gray-600">
          Fill out the sections below to create your professional resume.
        </p>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {getCompletionPercentage()}% complete
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex border-b border-gray-200 bg-gray-50">
                {['personal', 'experience', 'education', 'skills', 'template'].map(tab => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`px-4 py-3 text-sm font-medium flex-1 text-center border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="p-6">
                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                <TabsContent value="experience">
                  <ExperienceForm />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>
                <TabsContent value="template">
                  <TemplateSelection />
                </TabsContent>
              </div>
            </Tabs>

            {/* Navigation */}
            <div className="flex justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                onClick={() => {
                  const tabs = ['personal', 'experience', 'education', 'skills', 'template'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex > 0) {
                    setActiveTab(tabs[currentIndex - 1]);
                  }
                }}
                disabled={activeTab === 'personal'}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'personal'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  const tabs = ['personal', 'experience', 'education', 'skills', 'template'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
                disabled={activeTab === 'template'}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'template'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-8">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Resume Preview</h2>
            </div>
            <div className="p-4" ref={resumeRef}>
              <ResumePreview />
            </div>

            <div className="px-4 pb-4 mt-4 flex flex-col items-center">
              <button 
                onClick={downloadPDF}
                disabled={getCompletionPercentage() < 75}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Download PDF
              </button>

              {getCompletionPercentage() < 75 && (
                <p className="text-sm text-amber-600 mt-2 text-center">
                  Complete at least 75% of your resume to enable download
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
