import React from 'react';
import { Hash, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { modPow } from '../utils/rsaMath.js';

const ModularExponentiationHelper = ({
  showModExpHelper,
  dCorrect,
  c,
  d,
  n,
  setCalcResult
}) => {
  if (!showModExpHelper || !dCorrect) return null;

  const calculateModularExponentiation = () => {
    const result = modPow(c, parseInt(d), n);
    setCalcResult(`${c}^${d} mod ${n} = ${result}`);
  };

  return (
    <div className="mt-4 glass p-6 rounded-2xl border border-orange-300/50 bg-orange-100/20 dark:bg-orange-900/20 backdrop-blur-lg animate-slide-up mb-6">
      <h4 className="font-bold mb-4 text-orange-800 dark:text-orange-200 text-lg">{c}^{d} mod {n} の計算</h4>
      <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
        大きな指数の mod 計算を効率的に行います
      </p>
      
      <button
        onClick={calculateModularExponentiation}
        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-medium shadow-lg hover:scale-105 interactive"
      >
        計算実行
      </button>
    </div>
  );
};

const Step4Decryption = ({
  c,
  d,
  n,
  dCorrect,
  decryptedMessage,
  setDecryptedMessage,
  handleEnterKey,
  handleDecryptionCheck,
  checkDecryption,
  correctMessage,
  showModExpHelper,
  setShowModExpHelper,
  resetProblem,
  setShowCalculator,
  showCalculator,
  calcResult,
  setCalcResult
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
        🧮 ステップ4: 復号に挑戦
      </h2>
      
      <div className="mb-8">
        <p className="text-lg text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">
          暗号文 c = <span className="font-mono font-bold text-xl bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent">{c}</span> を復号してください
          <br />
          復号式: m = c<sup>d</sup> mod n = {c}<sup>{dCorrect ? d : '?'}</sup> mod {n}
        </p>
        
        <div className="flex gap-6 items-center flex-wrap mb-6">
          <div className="glass p-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30">
            <label className="block text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">復号した値 m =</label>
            <input
              type="number"
              value={decryptedMessage}
              onChange={(e) => setDecryptedMessage(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handleDecryptionCheck)}
              className="w-28 p-3 input-field rounded-xl font-mono text-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="?"
            />
          </div>
          
          <button
            onClick={handleDecryptionCheck}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 interactive"
          >
            ✅ 復号チェック
          </button>
        </div>

        {/* Modular Exponentiation Helper */}
        <button
          onClick={() => setShowModExpHelper(!showModExpHelper)}
          className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-orange-300/50 bg-orange-100/20 dark:bg-orange-900/20 hover:bg-orange-200/30 dark:hover:bg-orange-800/30 transition-all duration-300 hover:scale-105 interactive mb-6"
        >
          <Hash size={20} />
          {showModExpHelper ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          <span className="font-medium text-orange-700 dark:text-orange-300">🧮 大きな数の mod 計算ツール</span>
        </button>

        <ModularExponentiationHelper
          showModExpHelper={showModExpHelper}
          dCorrect={dCorrect}
          c={c}
          d={d}
          n={n}
          setCalcResult={setCalcResult}
        />

        {calcResult && calcResult.includes('mod') && (
          <div className="glass p-4 rounded-xl border border-blue-200/50 dark:border-blue-500/30 bg-white/30 dark:bg-slate-800/30 mb-6">
            <strong className="text-blue-800 dark:text-blue-200">計算結果:</strong> 
            <span className="font-mono ml-2 text-orange-600 dark:text-orange-400">{calcResult}</span>
          </div>
        )}
      </div>

      {checkDecryption() && (
        <div className="glass p-6 rounded-2xl border border-green-300/50 bg-green-100/20 dark:bg-green-900/20 backdrop-blur-lg mb-8 animate-slide-up success-bg">
          <h3 className="font-bold text-green-800 dark:text-green-200 mb-3 text-xl flex items-center gap-2">
            🎉 おめでとうございます！
            <Sparkles className="text-yellow-500" size={24} />
          </h3>
          <p className="text-green-700 dark:text-green-300 leading-relaxed">
            RSA暗号の復号に成功しました！<br/>
            復号された値 <span className="font-mono font-bold text-xl bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">{correctMessage}</span> は、ASCII文字 '<strong className="text-2xl text-green-600 dark:text-green-400">{String.fromCharCode(correctMessage)}</strong>' を表しています。
          </p>
          <div className="mt-4 p-4 glass rounded-xl border border-blue-200/50 dark:border-blue-500/30 bg-blue-100/20 dark:bg-blue-900/20">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">🎓 学習のまとめ</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>✓ RSA暗号の基本的な仕組みを理解しました</li>
              <li>✓ 素因数分解の重要性を学びました</li>
              <li>✓ オイラーのφ関数の計算ができました</li>
              <li>✓ 拡張ユークリッド互除法の概念を学びました</li>
              <li>✓ 実際の暗号文を復号することができました</li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={resetProblem}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 interactive"
        >
          🎲 新しい問題に挑戦
        </button>
        
        <button
          onClick={() => setShowCalculator(!showCalculator)}
          className="glass px-6 py-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-blue-700 dark:text-blue-300 interactive hover:glass-strong"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 14h.01M12 14h.01M15 14h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          電卓
        </button>
      </div>
    </div>
  );
};

export default Step4Decryption;
