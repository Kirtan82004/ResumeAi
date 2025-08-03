import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Award, Sparkles, CheckCircle } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Create the Perfect Resume with AI
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Build professional resumes in minutes with AI-powered suggestions, 
                professionally designed templates, and ATS optimization.
              </p>
              <div className="pt-4">
                <Link
                  to="/resume"
                  className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Build Your Resume
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Professional creating a resume" 
                className="rounded-lg shadow-xl w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose ResumeAI?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform helps you build professional resumes that get noticed by hiring managers and pass through ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-blue-600 mb-4">
                <Sparkles className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Content Suggestions</h3>
              <p className="text-gray-600">
                Get intelligent suggestions for skills, achievements, and summaries tailored to your experience and industry.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-blue-600 mb-4">
                <FileText className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that are optimized for readability and visual appeal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-blue-600 mb-4">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS Compatibility</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems with our ATS-friendly designs and keyword optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Create a professional resume in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Enter your information",
                description: "Fill out your personal details, work experience, education, and skills."
              },
              {
                step: "2",
                title: "Get AI suggestions",
                description: "Our AI will suggest improvements for your skills, achievements, and summary."
              },
              {
                step: "3",
                title: "Choose a template",
                description: "Select from our professional templates to showcase your experience."
              },
              {
                step: "4",
                title: "Download & apply",
                description: "Download your resume in PDF format and start applying for jobs."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/resume"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              See how ResumeAI has helped job seekers land their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                position: "UX Designer",
                quote: "ResumeAI helped me highlight my skills in a way that caught the attention of my dream company. I got the job within two weeks of applying!"
              },
              {
                name: "Michael Chen",
                position: "Software Engineer",
                quote: "The AI suggestions added achievements to my resume that I hadn't even thought to include. My interview rate increased dramatically."
              },
              {
                name: "Priya Sharma",
                position: "Marketing Manager",
                quote: "I was struggling to make my resume stand out. ResumeAI's templates and suggestions transformed my application and I landed multiple interviews."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;