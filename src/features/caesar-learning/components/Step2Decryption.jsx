import React from 'react';
import { Unlock, Lightbulb, ArrowRight, Calculator } from 'lucide-react';

export const Step2Decryption = ({ 
  currentProblem,
  currentProblemIndex,
  totalProblems,
  userPlaintext,
  setUserPlaintext,
  helperShift,
  setHelperShift,
  checkDecryption,
  decryptionCorrect,
  showHint,
  setShowHint,
  setCurrentStep,
  handleEnterKey,
  getHelperResult,
  nextProblem
}) => {
  const helperResult = getHelperResult();

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Unlock className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ2: 復号化チャレンジ</h2>
      </div>

      <div className="space-y-6">
        {/* 問題表示 */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-200">暗号文を復号化しよう</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-red-500 text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">暗号文</p>
            <p className="text-4xl font-mono font-bold text-red-600 dark:text-red-400 mb-4">{currentProblem.ciphertext}</p>
            <p className="text-gray-600 dark:text-gray-400">この暗号文を復号化して、元のメッセージを見つけてください。</p>
          </div>
        </div>

        {/* 補助ツール */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="text-blue-600 dark:text-blue-400" size={20} />
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">復号化補助ツール</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium min-w-0">シフト数を試す:</label>
              <input
                type="number"
                value={helperShift}
                onChange={(e) => setHelperShift(e.target.value)}
                className="input-field w-24 text-center"
                placeholder="1-25"
                min="1"
                max="25"
              />
              <div className="text-gray-600 dark:text-gray-400">→</div>
              <div className="flex-1 min-w-0">
                {helperResult && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">シフト{helperShift}の結果:</p>
                    <p className="text-xl font-mono font-bold text-blue-600 dark:text-blue-400">{helperResult}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                💡 いろいろなシフト数を試して、意味のある英単語になるまで調整してみましょう！
              </p>
            </div>
          </div>
        </div>

        {/* 答え入力 */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">復号化した結果を入力してください</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium">答え:</label>
              <input
                type="text"
                value={userPlaintext}
                onChange={(e) => setUserPlaintext(e.target.value.toUpperCase())}
                onKeyDown={(e) => handleEnterKey(e, checkDecryption)}
                className="input-field flex-1 max-w-md font-mono text-lg"
                placeholder="復号化した文字を入力"
              />
              <button
                onClick={checkDecryption}
                className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                  decryptionCorrect 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                disabled={decryptionCorrect}
              >
                {decryptionCorrect ? '正解！' : 'チェック'}
              </button>
            </div>

            {!decryptionCorrect && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 transition-colors"
              >
                <Lightbulb size={16} />
                {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
              </button>
            )}

            {showHint && (
              <div className="bg-green-100 dark:bg-green-800/30 rounded-lg p-4 border-l-4 border-green-500">
                <p className="text-green-800 dark:text-green-200">{currentProblem.hint}</p>
              </div>
            )}
          </div>
        </div>

        {/* 成功メッセージ - 学習完了 */}
        {decryptionCorrect && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">🎉 シーザー暗号をマスターしました！</h4>
            <p className="text-green-700 dark:text-green-300 mb-4">
              正解は「{currentProblem.plaintext}」でした。暗号化と復号化の基本原理を理解できました。<br/>
              この知識は現代の暗号技術の理解にも役立ちます。
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  // 次の問題に移動してステップ1に戻る
                  const nextIndex = (currentProblemIndex + 1) % totalProblems;
                  if (nextIndex !== currentProblemIndex) {
                    // nextProblem関数を呼び出してからステップをリセット
                    window.setTimeout(() => {
                      setUserPlaintext('');
                      setHelperShift('');
                      setShowHint(false);
                      setCurrentStep(1);
                    }, 100);
                  } else {
                    // 同じ問題の場合はステップ1に戻すだけ
                    setCurrentStep(1);
                  }
                  // 親コンポーネントから渡された関数を使用
                  if (typeof nextProblem === 'function') {
                    nextProblem();
                  }
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔄 別の問題に挑戦
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};