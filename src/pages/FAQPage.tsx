import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How can I edit my resume?',
    answer: 'You can edit your resume by navigating to the Resume Builder section and updating your information in the form.',
  },
  {
    question: 'Can I download the resume as a PDF?',
    answer: 'Yes, after completing your resume, you can click the Download button to save it as a PDF.',
  },
  {
    question: 'Is my data saved automatically?',
    answer: 'Yes, your data is saved automatically in local storage. But make sure to export or save it for future use.',
  },
  {
    question: 'How do I switch between templates?',
    answer: 'You can switch templates from the template selection page without losing your data.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold"
              onClick={() => toggle(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
