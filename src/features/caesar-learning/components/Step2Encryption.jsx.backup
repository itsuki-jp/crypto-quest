import React from 'react';
import { Lock, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';

const Step2Encryption = ({ 
  currentProblem,
  userShift,
  setUserShift,
  userCiphertext,
  setUserCiphertext,
  checkShift,
  checkEncryption,
  shiftCorrect,
  encryptionCorrect,
  showHint,
  setShowHint,
  setCurrentStep,
  handleEnterKey,
  caesarCipher,
  generateAlphabet
}) => {
  const { normal, shifted } = generateAlphabet(parseInt(userShift) || 0);

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <Lock className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ2: 暗号化体験</h2>
      </div>

      <div className="space-y-6">
        {/* 問題表示 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">暗号化問題</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">平文（元のメッセージ）</p>
              <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">{currentProblem.plaintext}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">目標の暗号文</p>
              <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">{currentProblem.ciphertext}</p>
            </div>
          </div>
        </div>

        {/* シフト値入力 */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-yellow-800 dark:text-yellow-200">ステップ2-1: シフト値を見つけよう</h4>
          <div className="flex items-center gap-4 mb-4">
            <label className="text-gray-700 dark:text-gray-300 font-medium">シフト値:</label>
            <input
              type="number"
              value={userShift}
              onChange={(e) => setUserShift(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, checkShift)}
              className="input-field w-24 text-center"
              placeholder="?"
              min="1"
              max="25"
            />
            <button
              onClick={checkShift}
              className={`px-4 py-2 rounded-lg transition-colors ${
                shiftCorrect 
                  ? 'bg-green-600 text-white cursor-not-allowed' 
                  : 'bg-yellow-600 hover:bg-yellow-700 text-white'
              }`}
              disabled={shiftCorrect}
            >
              {shiftCorrect ? '正解！' : 'チェック'}
            </button>
          </div>

          {userShift && !shiftCorrect && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">シフト{userShift}のアルファベット対応表:</p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {normal.map((letter, index) => (
                    <div key={index} className="w-6 h-6 bg-gray-100 dark:bg-gray-700 border rounded flex items-center justify-center text-xs font-mono">
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {shifted.map((letter, index) => (
                    <div key={index} className="w-6 h-6 bg-yellow-100 dark:bg-yellow-800 border rounded flex items-center justify-center text-xs font-mono font-bold">
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!shiftCorrect && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors"
            >
              <Lightbulb size={16} />
              {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
            </button>
          )}

          {showHint && (
            <div className="mt-4 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-yellow-800 dark:text-yellow-200">{currentProblem.hint}</p>
            </div>
          )}
        </div>

        {/* 暗号化実行 */}
        {shiftCorrect && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">ステップ2-2: 暗号化してみよう</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 dark:text-gray-300 font-medium">暗号文:</label>
                <input
                  type="text"
                  value={userCiphertext}
                  onChange={(e) => setUserCiphertext(e.target.value.toUpperCase())}
                  onKeyDown={(e) => handleEnterKey(e, checkEncryption)}
                  className="input-field flex-1 max-w-md font-mono"
                  placeholder="暗号文を入力してください"
                />
                <button
                  onClick={checkEncryption}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    encryptionCorrect 
                      ? 'bg-green-600 text-white cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                  disabled={encryptionCorrect}
                >
                  {encryptionCorrect ? '正解！' : 'チェック'}
                </button>
              </div>

              {userShift && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">変換過程:</p>
                  <div className="space-y-2">
                    {currentProblem.plaintext.split('').map((char, index) => {
                      const encrypted = caesarCipher(char, parseInt(userShift));
                      return (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{char}</span>
                          <span className="text-gray-500">→</span>
                          <span className="font-mono font-bold text-green-600 dark:text-green-400">{encrypted}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 次のステップボタン */}
        {encryptionCorrect && (
          <div className="flex justify-center">
            <button
              onClick={() => setCurrentStep(3)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              復号化に挑戦
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2Encryption;