import React from 'react';
import { Calculator } from 'lucide-react';

const CalculatorWidget = ({ 
  showCalculator, 
  calcInput, 
  setCalcInput, 
  handleEnterKey, 
  calculateExpression, 
  calcResult 
}) => {
  if (!showCalculator) return null;

  return (
    <div className="glass rounded-2xl p-6 mb-8 backdrop-blur-xl shadow-xl border border-white/20 dark:border-gray-700/50 animate-slide-up">
      <h4 className="font-bold mb-4 flex items-center gap-3 text-gray-800 dark:text-white text-lg">
        <Calculator className="text-blue-500" size={20} />
        🧮 電卓
      </h4>
      <div className="flex gap-3">
        <input
          type="text"
          value={calcInput}
          onChange={(e) => setCalcInput(e.target.value)}
          onKeyDown={(e) => handleEnterKey(e, calculateExpression)}
          placeholder="例: 12 * 10, 120 / 7, 143 % 11"
          className="flex-1 p-3 input-field rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={calculateExpression}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
        >
          計算
        </button>
      </div>
      {calcResult && (
        <div className="mt-4 p-4 glass rounded-xl border border-white/20 dark:border-gray-700/50 bg-white/10 dark:bg-black/10">
          <span className="text-gray-700 dark:text-gray-300">結果: </span>
          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{calcResult}</span>
        </div>
      )}
    </div>
  );
};

export default CalculatorWidget;
