import React from 'react';
import { Unlock, Lightbulb, Trophy, ArrowRight } from 'lucide-react';

const Step3Decryption = ({ 
  currentProblem,
  currentProblemIndex,
  totalProblems,
  userPlaintext,
  setUserPlaintext,
  checkDecryption,
  decryptionCorrect,
  showHint,
  setShowHint,
  showSBox,
  setShowSBox,
  handleEnterKey,
  nextProblem,
  SBOX,
  setCurrentStep
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
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">攻撃者が知っている情報</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">攻撃者が知っている情報</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">暗号文:</span>
                  <span className="font-mono bg-red-100 dark:bg-red-800 px-2 py-1 rounded text-sm">{currentProblem.ciphertext}</span>
                  <span className="text-green-600">✓ 公開</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">S-Box:</span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">標準テーブル</span>
                  <span className="text-green-600">✓ 公開</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">キー:</span>
                  <span className="font-mono bg-green-100 dark:bg-green-800 px-2 py-1 rounded">{currentProblem.key}</span>
                  <span className="text-red-600">✗ 秘密</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">平文:</span>
                  <span className="text-gray-500">❓ 不明</span>
                  <span className="text-red-600">✗ 秘密</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🔑 暗号文とS-Boxは公開情報。キーと平文は秘密です。<br/>
                目標: 暗号文から元の平文を推測してください。
              </p>
            </div>
          </div>
        </div>

        {/* S-Boxテーブル表示 */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200">AES S-Boxテーブル（公開情報）</h4>
            <button
              onClick={() => setShowSBox(!showSBox)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showSBox ? '隠す' : '表示する'}
            </button>
          </div>
          
          {showSBox && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-16 gap-1 text-xs font-mono mb-4">
                {SBOX.map((value, index) => (
                  <div 
                    key={index} 
                    className="w-6 h-6 bg-gray-100 dark:bg-gray-700 border flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors text-xs"
                    title={`インデックス: ${index.toString(16).toUpperCase()}`}
                  >
                    {value.toString(16).padStart(2, '0').toUpperCase()}
                  </div>
                ))}
              </div>
              <p className="text-xs text-purple-600 dark:text-purple-400">
                🔓 このS-Boxは公開標準で、攻撃者も知っています。セキュリティは秘密キーに依存します。
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">復号化補助ツール</h4>
          <div className="space-y-4">
            {/* S-Box逆引きツール */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-3">S-Box逆引きツール</h5>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  placeholder="16進数値(C5など)"
                  className="input-field w-32 text-center font-mono"
                  onChange={(e) => {
                    const hex = e.target.value.toUpperCase();
                    const result = e.target.nextElementSibling;
                    if (hex.length === 2 && /^[0-9A-F]{2}$/.test(hex)) {
                      const val = parseInt(hex, 16);
                      const original = SBOX.findIndex(x => x === val);
                      result.textContent = original >= 0 ? `→ 元の値: ${original.toString(16).padStart(2, '0').toUpperCase()}` : '→ 見つかりません';
                    } else {
                      result.textContent = '→ 2桁の16進数で入力';
                    }
                  }}
                />
                <span className="text-sm text-gray-500">→ 2桁の16進数で入力</span>
              </div>
              <div className="text-xs text-gray-500">
                S-Box変換された値から元の値を推定します。
              </div>
            </div>

            {/* クイックテスト */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h5 className="font-medium text-blue-700 dark:text-blue-300 mb-2">クイックテスト</h5>
              <div className="flex gap-2 flex-wrap">
                {['HELLO WORLD 2024', 'SECURITY IS COOL', 'AES ENCRYPTION!', 'NETWORK PASSWORD'].map((phrase, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setUserPlaintext(phrase);
                      setTimeout(() => checkDecryption(), 100);
                    }}
                    className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors font-mono"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                クリックで自動入力・チェック
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h4 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">平文を推測してください</h4>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-700 dark:text-gray-300 font-medium">答え:</label>
              <input
                type="text"
                value={userPlaintext}
                onChange={(e) => setUserPlaintext(e.target.value)}
                onKeyDown={(e) => handleEnterKey(e, checkDecryption)}
                className="input-field flex-1 max-w-md font-mono"
                placeholder="復号化した平文を入力"
                maxLength={16}
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
                <p className="text-green-800 dark:text-green-200">
                  ヒント: {currentProblem.description}。平文は16文字です。
                </p>
              </div>
            )}
          </div>
        </div>

        {decryptionCorrect && (
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 rounded-2xl p-6 text-center">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">🎉 正解！</h4>
            <p className="text-green-700 dark:text-green-300 mb-4">
              正解は「{currentProblem.plaintext}」でした。<br/>
              実際の復号化手順を学びたい場合は、詳細手順へ進んでください。
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  nextProblem();
                  setUserPlaintext('');
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={currentProblemIndex >= totalProblems - 1}
              >
                🔄 次の問題
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                復号化手順を学ぶ
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3Decryption;