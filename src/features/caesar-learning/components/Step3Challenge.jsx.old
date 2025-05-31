import React from 'react';
import { Unlock, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

const Step3Decryption = ({ 
  currentProblem,
  userPlaintext,
  setUserPlaintext,
  checkDecryption,
  decryptionCorrect,
  setCurrentStep,
  handleEnterKey,
  caesarDecipher
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Unlock className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ3: 復号化チャレンジ</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">復号化問題</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">暗号文</p>
              <p className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">{currentProblem.ciphertext}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">シフト値</p>
              <p className="text-2xl font-mono font-bold text-yellow-600 dark:text-yellow-400">{currentProblem.shift}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-gray-500">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">目標の平文</p>
              <p className="text-2xl font-mono font-bold text-gray-600 dark:text-gray-400">?????</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-indigo-800 dark:text-indigo-200">復号化してみよう</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium">平文:</label>
              <input
                type="text"
                value={userPlaintext}
                onChange={(e) => setUserPlaintext(e.target.value.toUpperCase())}
                onKeyDown={(e) => handleEnterKey(e, checkDecryption)}
                className="input-field flex-1 max-w-md font-mono"
                placeholder="復号化した文字を入力"
              />
              <button
                onClick={checkDecryption}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  decryptionCorrect 
                    ? 'bg-green-600 text-white cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
                disabled={decryptionCorrect}
              >
                {decryptionCorrect ? '正解！' : 'チェック'}
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">ヒント: 復号化の手順</p>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>1. 暗号文の各文字を、シフト値分だけ<strong>左</strong>にずらします</p>
                <p>2. A～Zの範囲を超えた場合は、反対側から続けます</p>
                <p>3. 例: シフト{currentProblem.shift}の場合、{currentProblem.ciphertext.charAt(0)} → {caesarDecipher(currentProblem.ciphertext.charAt(0), currentProblem.shift)}</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">変換過程:</p>
              <div className="space-y-2">
                {currentProblem.ciphertext.split('').map((char, index) => {
                  const decrypted = caesarDecipher(char, currentProblem.shift);
                  return (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <span className="font-mono font-bold text-red-600 dark:text-red-400">{char}</span>
                      <span className="text-gray-500">→</span>
                      <span className="font-mono font-bold text-green-600 dark:text-green-400">{decrypted}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {decryptionCorrect && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center">
            <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">🎉 よくできました！</h4>
            <p className="text-green-700 dark:text-green-300 mb-4">
              シーザー暗号の復号化をマスターしました。最後のチャレンジに挑戦してみましょう！
            </p>
            <button
              onClick={() => setCurrentStep(4)}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 mx-auto"
            >
              チャレンジに挑戦
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3Decryption;