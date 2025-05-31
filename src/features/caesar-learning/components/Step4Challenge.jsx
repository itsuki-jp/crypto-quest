import React from 'react';
import { Trophy, Sparkles, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const Step4Challenge = ({ 
  currentProblem,
  currentProblemIndex,
  totalProblems,
  customText,
  setCustomText,
  customShift,
  setCustomShift,
  encryptCustomText,
  nextProblem,
  previousProblem,
  resetAll,
  caesarCipher,
  caesarDecipher
}) => {
  const customResult = encryptCustomText();

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
          <Trophy className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ4: 自由チャレンジ</h2>
      </div>

      <div className="space-y-6">
        {/* 問題ナビゲーション */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">練習問題</h3>
            <div className="text-sm text-blue-600 dark:text-blue-400">
              {currentProblemIndex + 1} / {totalProblems}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">平文</p>
              <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{currentProblem.plaintext}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">シフト値</p>
              <p className="text-lg font-mono font-bold text-yellow-600 dark:text-yellow-400">{currentProblem.shift}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">暗号文</p>
              <p className="text-lg font-mono font-bold text-red-600 dark:text-red-400">{currentProblem.ciphertext}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={previousProblem}
              disabled={currentProblemIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentProblemIndex === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <ArrowLeft size={16} />
              前の問題
            </button>
            <button
              onClick={nextProblem}
              disabled={currentProblemIndex === totalProblems - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentProblemIndex === totalProblems - 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              次の問題
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* カスタム暗号化ツール */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-600 dark:text-purple-400" size={20} />
            <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">オリジナル暗号化ツール</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  暗号化したいテキスト
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                  className="input-field w-full font-mono"
                  placeholder="HELLO WORLD"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  シフト値 (1-25)
                </label>
                <input
                  type="number"
                  value={customShift}
                  onChange={(e) => setCustomShift(e.target.value)}
                  className="input-field w-full text-center"
                  placeholder="3"
                  min="1"
                  max="25"
                />
              </div>
            </div>

            {customResult && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">暗号化結果</p>
                    <p className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">{customResult}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">復号化（確認用）</p>
                    <p className="text-xl font-mono font-bold text-green-600 dark:text-green-400">
                      {customShift ? caesarDecipher(customResult, parseInt(customShift)) : ''}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💡 チャレンジアイデア</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 友達に暗号化したメッセージを送ってみよう</li>
                <li>• シフト値を変えて、同じメッセージでも違う暗号文になることを確かめよう</li>
                <li>• 長い文章を暗号化してみよう（スペースや記号はそのまま残ります）</li>
                <li>• ROT13（シフト13）で暗号化・復号化してみよう</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 学習完了メッセージ */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 text-center">
          <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">🎉 シーザー暗号をマスターしました！</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            暗号化と復号化の基本原理を理解できました。この知識は現代の暗号技術の理解にも役立ちます。
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={resetAll}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={16} />
              最初から学習
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Challenge;