import React from 'react';
import { Calculator } from 'lucide-react';
import DivisionHelper from './DivisionHelper.jsx';

const Step2Factorization = ({ 
  n,
  p,
  setP,
  q, 
  setQ,
  handleEnterKey,
  handleFactorCheck,
  factorsCorrect,
  setCurrentStep,
  setShowCalculator,
  showCalculator,
  showDivisionHelper,
  setShowDivisionHelper,
  divisionInput,
  setDivisionInput
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
        🧠 ステップ2: p, q を求めよう
      </h2>
      
      <div className="mb-8">
        <p className="text-lg text-gray-900 dark:text-blue-300 mb-6 leading-relaxed">
          n = <span className="font-mono font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">{n}</span> を2つの素数の積に分解してください: n = p × q
        </p>
        
        <div className="flex gap-6 items-center flex-wrap">
          <div className="glass p-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-blue-300">p =</label>
            <input
              type="number"
              value={p}
              onChange={(e) => setP(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handleFactorCheck)}
              className="w-24 p-3 input-field rounded-xl font-mono text-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="?"
            />
          </div>
          
          <div className="text-3xl font-bold text-blue-800 dark:text-blue-400">×</div>
          
          <div className="glass p-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-blue-300">q =</label>
            <input
              type="number"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handleFactorCheck)}
              className="w-24 p-3 input-field rounded-xl font-mono text-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="?"
            />
          </div>

          <button
            onClick={handleFactorCheck}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
          >
            ✅ チェック
          </button>
        </div>
      </div>

      <DivisionHelper 
        showDivisionHelper={showDivisionHelper}
        setShowDivisionHelper={setShowDivisionHelper}
        divisionInput={divisionInput}
        setDivisionInput={setDivisionInput}
        n={n}
      />

      <div className="flex gap-4 flex-wrap">
        {factorsCorrect && (
          <button
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            次のステップへ →
          </button>
        )}
        
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="glass px-6 py-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-gray-900 dark:text-blue-300 interactive hover:glass-strong"
        >
          <Calculator size={20} />
          電卓
        </button>
      </div>
    </div>
  );
};

export default Step2Factorization;
