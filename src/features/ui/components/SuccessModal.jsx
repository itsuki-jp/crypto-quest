import React from 'react';

const SuccessModal = ({ showSuccessMessage }) => {
  if (!showSuccessMessage) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className={`glass p-6 rounded-3xl shadow-2xl max-w-md mx-4 backdrop-blur-xl border-2 animate-slide-up ${
        showSuccessMessage.includes('✅') ? 
        'border-green-400/50 bg-green-500/10' : 
        'border-red-400/50 bg-red-500/10'
      }`}>
        <div className={`text-lg font-bold text-center ${
          showSuccessMessage.includes('✅') ? 
          'text-green-700 dark:text-green-300' : 
          'text-red-700 dark:text-red-300'
        }`}>
          {showSuccessMessage.split('\n').map((line, i) => (
            <div key={i} className="mb-1">{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
