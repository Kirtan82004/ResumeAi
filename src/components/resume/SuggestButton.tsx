import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const SuggestButton: React.FC<SuggestButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded 
        shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        ${disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500'}
      `}
    >
      <Sparkles className="mr-1 h-3.5 w-3.5" />
      AI Suggest
    </button>
  );
};