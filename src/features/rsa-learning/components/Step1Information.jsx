import React from 'react';
import { Eye, EyeOff, Calculator } from 'lucide-react';

const Step1Information = ({ 
  n, 
  e, 
  c, 
  showHint, 
  setShowHint, 
  setCurrentStep, 
  setShowCalculator, 
  showCalculator 
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
        📋 ステップ1: 与えられた情報
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-lg">
          <h3 className="font-bold text-xl mb-4 text-blue-900 dark:text-blue-200 flex items-center gap-2">
            🔑 公開鍵 (n, e)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-900 dark:text-blue-300">n =</span>
              <span className="font-mono text-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent font-bold">
                {n}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-900 dark:text-blue-300">e =</span>
              <span className="font-mono text-2xl bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent font-bold">
                {e}
              </span>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 backdrop-blur-lg">
          <h3 className="font-bold text-xl mb-4 text-blue-900 dark:text-blue-200 flex items-center gap-2">
            🔐 暗号文
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-900 dark:text-blue-300">c =</span>
            <span className="font-mono text-2xl bg-gradient-to-r from-red-500 to-red-700 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent font-bold">
              {c}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 hover:bg-amber-200/30 dark:hover:bg-amber-800/30 transition-all duration-300 hover:scale-105 interactive"
        >
          {showHint ? <EyeOff size={20} /> : <Eye size={20} />}
          <span className="font-medium text-amber-900 dark:text-amber-300">💡 ヒントを見る</span>
        </button>
        
        {showHint && (
          <div className="mt-4 glass p-6 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 backdrop-blur-lg animate-slide-up">
            <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
              💡 <strong>ヒント:</strong> nは2つの素数の積です。この2つの素数を見つけることから始めましょう！
              RSA暗号の安全性は、大きな数の素因数分解が困難であることに基づいています。
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-4 flex-wrap">
        <button
          onClick={() => setCurrentStep(2)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 interactive"
        >
          次のステップへ →
        </button>
        
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

export default Step1Information;
