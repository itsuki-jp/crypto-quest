import React from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import { getDivisionTable } from '../utils/rsaMath.js';

const DivisionHelper = ({ 
  showDivisionHelper, 
  setShowDivisionHelper, 
  divisionInput, 
  setDivisionInput, 
  n 
}) => {
  return (
    <div className="mb-8">
      <button
        onClick={() => setShowDivisionHelper(!showDivisionHelper)}
        className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-purple-300/50 bg-purple-100/10 hover:bg-purple-200/20 transition-all duration-300 hover:scale-105"
      >
        <Calculator size={20} />
        {showDivisionHelper ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        <span className="font-medium text-purple-700 dark:text-purple-300">🧩 割り算支援ツール</span>
      </button>

      {showDivisionHelper && (
        <div className="mt-4 glass p-6 rounded-2xl border border-purple-300/50 bg-purple-100/10 backdrop-blur-lg animate-slide-up">
          <h4 className="font-bold mb-4 text-purple-800 dark:text-purple-200 text-lg">🧮 割り算支援ツール</h4>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-900 dark:text-blue-300">
              因数分解したい数を入力してください：
            </label>
            <div className="flex gap-3">
              <input
                type="number"
                value={divisionInput}
                onChange={(e) => setDivisionInput(e.target.value)}
                placeholder="例: 143, 77, 221 など"
                className="flex-1 p-3 input-field rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => setDivisionInput(n.toString())}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium shadow-lg hover:scale-105"
              >
                n={n}を使用
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              💡 ヒント: まずは問題のnを入力してみましょう（n = {n}）
            </p>
          </div>
          
          {divisionInput && parseInt(divisionInput) > 1 && (
            <div className="glass p-4 rounded-xl border border-purple-200/50 dark:border-purple-500/30 bg-white/20 dark:bg-slate-800/20">
              <h5 className="font-semibold mb-3 text-blue-900 dark:text-blue-100">
                {divisionInput} の約数チェック
              </h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-purple-200/50 dark:border-purple-500/30">
                      <th className="text-left p-3 text-gray-900 dark:text-blue-200 font-medium">割る数</th>
                      <th className="text-left p-3 text-gray-900 dark:text-blue-200 font-medium">商</th>
                      <th className="text-left p-3 text-gray-900 dark:text-blue-200 font-medium">余り</th>
                      <th className="text-left p-3 text-gray-900 dark:text-blue-200 font-medium">約数？</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDivisionTable(divisionInput).map((row, i) => (
                      <tr key={i} className={`border-b border-purple-100/30 dark:border-purple-700/30 transition-colors ${
                        row.isDivisor ? 'bg-yellow-400/20 dark:bg-yellow-500/20' : 'hover:bg-purple-100/20 dark:hover:bg-purple-800/20'
                      }`}>
                        <td className="p-3 text-gray-900 dark:text-blue-100">{divisionInput} ÷ {row.divisor}</td>
                        <td className="p-3 text-gray-900 dark:text-blue-100 font-mono">{row.quotient}</td>
                        <td className="p-3 text-gray-900 dark:text-blue-100 font-mono">{row.remainder}</td>
                        <td className="p-3">
                          {row.isDivisor ? (
                            <span className="text-green-600 dark:text-green-400 font-medium">✅ はい</span>
                          ) : (
                            <span className="text-red-500 dark:text-red-400">❌ いいえ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {getDivisionTable(divisionInput).filter(row => row.isDivisor).length > 0 && (
                <div className="mt-4 glass p-4 rounded-xl border border-yellow-300/50 bg-yellow-100/10">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    🎯 見つかった約数: {getDivisionTable(divisionInput)
                      .filter(row => row.isDivisor)
                      .map(row => `${row.divisor} × ${row.quotient} = ${divisionInput}`)
                      .join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {divisionInput && parseInt(divisionInput) <= 1 && (
            <div className="glass p-4 rounded-xl border border-purple-300/50 bg-purple-100/20 dark:bg-purple-900/20">
              <p className="text-sm text-gray-900 dark:text-blue-200">
                1より大きい数を入力してください
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DivisionHelper;
