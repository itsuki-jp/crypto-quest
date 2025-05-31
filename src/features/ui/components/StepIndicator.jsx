import React from 'react';
import { Check, Sparkles } from 'lucide-react';

const StepIndicator = ({ step, isActive, isCompleted, title }) => (
  <div className={`relative flex items-center p-4 rounded-2xl border-2 transition-all duration-300 glass animate-slide-up hover:scale-105 interactive ${
    isActive ? 'border-blue-400 bg-blue-500/10 backdrop-blur-xl shadow-lg glass-strong' : 
    isCompleted ? 'border-green-400 bg-green-500/10 backdrop-blur-xl shadow-lg' : 
    'border-blue-200/50 dark:border-blue-500/30 bg-white/5 dark:bg-slate-800/10 backdrop-blur-lg'
  }`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
      isActive ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg animate-glow' : 
      isCompleted ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' : 
      'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-300'
    }`}>
      {isCompleted ? <Check size={18} /> : step}
    </div>
    <span className={`ml-3 font-medium transition-colors ${
      isActive ? 'text-blue-900 dark:text-blue-200' :
      isCompleted ? 'text-green-900 dark:text-green-200' :
      'text-gray-900 dark:text-gray-300'
    }`}>{title}</span>
    {isActive && <Sparkles className="absolute -top-2 -right-2 text-blue-500 float" size={16} />}
  </div>
);

export default StepIndicator;
