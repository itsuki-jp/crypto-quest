import React from 'react';
import { Eye, EyeOff, Book, ChevronDown, ChevronUp } from 'lucide-react';

const EuclideanHelper = ({ showEuclidHelper, setShowEuclidHelper, phi, e }) => {
  if (!showEuclidHelper || !phi) return null;

  return (
    <div className="mt-4 glass p-6 rounded-2xl border border-indigo-300/50 bg-indigo-100/20 dark:bg-indigo-900/20 backdrop-blur-lg animate-slide-up">
      <h4 className="font-bold mb-4 text-indigo-800 dark:text-indigo-200 text-lg">拡張ユークリッド互除法の使い方</h4>
      <div className="space-y-4 text-sm">
        <p className="text-indigo-700 dark:text-indigo-300">
          <strong>目標:</strong> {phi} × s + {e} × t = 1 となる t を求める（t が d になります）
        </p>
        
        <div className="glass p-4 rounded-xl border border-blue-200/50 dark:border-blue-500/30 bg-white/20 dark:bg-slate-800/20">
          <p className="font-semibold mb-3 text-blue-800 dark:text-blue-200">ステップ1: ユークリッド互除法</p>
          <div className="space-y-2 font-mono text-xs">
            <div className="text-blue-700 dark:text-blue-300">{phi} = {Math.floor(phi/e)} × {e} + {phi % e}</div>
            <div className="text-blue-700 dark:text-blue-300">{e} = {Math.floor(e/(phi % e))} × {phi % e} + {e % (phi % e)}</div>
            <div className="text-blue-700 dark:text-blue-300">...</div>
            <div className="text-blue-700 dark:text-blue-300">最終的に gcd = 1 になることを確認</div>
          </div>
        </div>
        
        <div className="glass p-4 rounded-xl border border-blue-200/50 dark:border-blue-500/30 bg-white/20 dark:bg-slate-800/20">
          <p className="font-semibold mb-3 text-blue-800 dark:text-blue-200">ステップ2: 逆算</p>
          <p className="text-blue-700 dark:text-blue-300">上記の式を逆算して、1 = {phi} × s + {e} × t の形にします</p>
          <p className="text-blue-700 dark:text-blue-300">この時の t が求める d です</p>
        </div>
        
        <div className="glass p-4 rounded-xl border border-yellow-300/50 bg-yellow-100/20 dark:bg-yellow-900/20">
          <p className="font-semibold text-yellow-800 dark:text-yellow-200">簡単な方法:</p>
          <p className="text-yellow-700 dark:text-yellow-300">d = 1, 2, 3, ... を順番に試して、(d × {e}) mod {phi} = 1 になる d を見つける</p>
        </div>
      </div>
    </div>
  );
};

const Step3KeyCalculation = ({
  p,
  q,
  factorsCorrect,
  phi,
  setPhi,
  handleEnterKey,
  handlePhiCheck,
  phiCorrect,
  showHint2,
  setShowHint2,
  d,
  setD,
  handleDCheck,
  dCorrect,
  showHint3,
  setShowHint3,
  showEuclidHelper,
  setShowEuclidHelper,
  setCurrentStep,
  setShowCalculator,
  showCalculator,
  e
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
        🔧 ステップ3: φ(n), d を求めよう
      </h2>
      
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 text-blue-800 dark:text-blue-200">φ(n) の計算</h3>
        
        <button
          onClick={() => setShowHint2(!showHint2)}
          className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 hover:bg-amber-200/30 dark:hover:bg-amber-800/30 transition-all duration-300 hover:scale-105 interactive mb-4"
        >
          {showHint2 ? <EyeOff size={20} /> : <Eye size={20} />}
          <span className="font-medium text-amber-700 dark:text-amber-300">💡 ヒント1を見る</span>
        </button>
        
        {showHint2 && factorsCorrect && (
          <div className="mb-6 glass p-6 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 backdrop-blur-lg animate-slide-up">
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
              💡 <strong>ヒント1:</strong> φ(n) = (p-1)(q-1) = ({Math.min(parseInt(p), parseInt(q))}-1)({Math.max(parseInt(p), parseInt(q))}-1)
              <br />これはオイラーのφ関数（トーシェント関数）と呼ばれ、nと互いに素な正の整数の個数を表します。
            </p>
          </div>
        )}
        
        <div className="flex gap-6 items-center flex-wrap">
          <div className="glass p-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30">
            <label className="block text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">φ(n) =</label>
            <input
              type="number"
              value={phi}
              onChange={(e) => setPhi(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handlePhiCheck)}
              className="w-28 p-3 input-field rounded-xl font-mono text-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="?"
            />
          </div>
          
          <button
            onClick={handlePhiCheck}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 interactive"
          >
            ✅ チェック
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 text-blue-800 dark:text-blue-200">秘密鍵 d の計算</h3>
        
        <button
          onClick={() => setShowHint3(!showHint3)}
          className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 hover:bg-amber-200/30 dark:hover:bg-amber-800/30 transition-all duration-300 hover:scale-105 interactive mb-4"
        >
          {showHint3 ? <EyeOff size={20} /> : <Eye size={20} />}
          <span className="font-medium text-amber-700 dark:text-amber-300">💡 ヒント2を見る</span>
        </button>
        
        {showHint3 && (
          <div className="mb-6 glass p-6 rounded-2xl border border-amber-300/50 bg-amber-100/20 dark:bg-amber-900/20 backdrop-blur-lg animate-slide-up">
            <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
              💡 <strong>ヒント2:</strong> d × e ≡ 1 (mod φ(n)) となる d を求めます
              <br />
              {phiCorrect ? (
                <>つまり、d × {e} ≡ 1 (mod {phi}) となる d を見つけましょう<br />
                簡単な方法: d = 1, 2, 3, ... を順番に試して、(d × {e}) mod {phi} = 1 になる d を見つける</>
              ) : (
                'まずφ(n)を正しく求めてください'
              )}
            </p>
          </div>
        )}
        
        <div className="flex gap-6 items-center flex-wrap">
          <div className="glass p-4 rounded-2xl border border-blue-200/50 dark:border-blue-500/30">
            <label className="block text-sm font-medium mb-2 text-blue-700 dark:text-blue-300">d =</label>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, handleDCheck)}
              className="w-28 p-3 input-field rounded-xl font-mono text-lg text-center transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="?"
            />
          </div>
          
          <button
            onClick={handleDCheck}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 interactive"
          >
            ✅ チェック
          </button>
        </div>
      </div>

      {/* Extended Euclidean Helper */}
      <div className="mb-8">
        <button
          onClick={() => setShowEuclidHelper(!showEuclidHelper)}
          className="flex items-center gap-3 glass px-6 py-3 rounded-2xl border border-indigo-300/50 bg-indigo-100/20 dark:bg-indigo-900/20 hover:bg-indigo-200/30 dark:hover:bg-indigo-800/30 transition-all duration-300 hover:scale-105 interactive"
        >
          <Book size={20} />
          {showEuclidHelper ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          <span className="font-medium text-indigo-700 dark:text-indigo-300">🧠 拡張ユークリッド補助</span>
        </button>

        <EuclideanHelper 
          showEuclidHelper={showEuclidHelper}
          setShowEuclidHelper={setShowEuclidHelper}
          phi={parseInt(phi)}
          e={e}
        />
      </div>

      <div className="flex gap-4 flex-wrap">
        {phiCorrect && dCorrect && (
          <button
            onClick={() => setCurrentStep(4)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 interactive"
          >
            次のステップへ →
          </button>
        )}
        
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

export default Step3KeyCalculation;
