import React from 'react';
import { Moon, Sun } from 'lucide-react';

const AppHeader = ({ isDarkMode, toggleDarkMode, resetProblem, checkDecryption, correctMessage }) => {
  return (
    <div className="glass rounded-3xl p-6 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent animate-bounce-subtle">
          🎓 Mini-RSA 体験型学習
        </h1>
        
        <button
          onClick={() => {
            console.log('Dark mode button clicked');
            toggleDarkMode();
          }}
          className="glass p-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-blue-200/50 dark:border-blue-500/30 group hover:glass-strong"
          title={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        >
          {isDarkMode ? (
            <Sun className="text-yellow-500 group-hover:text-yellow-400 transition-colors" size={24} />
          ) : (
            <Moon className="text-blue-600 group-hover:text-blue-700 transition-colors" size={24} />
          )}
        </button>
      </div>
      
      <div className="text-center">
        <button
          onClick={resetProblem}
          className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 pulse-glow"
        >
          🎲 新しい問題を生成
        </button>
        {checkDecryption() && (
          <div className="mt-4 glass rounded-xl p-3 backdrop-blur-sm border border-green-200/50 dark:border-green-500/30 success-bg">
            <p className="text-sm font-medium text-green-800 dark:text-green-200">
              🎉 復号成功！暗号化されていた文字: '<strong className="text-lg text-green-700 dark:text-green-300">{String.fromCharCode(correctMessage)}</strong>' (ASCII: {correctMessage})
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
