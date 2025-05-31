import React from 'react';
import { Settings, Calculator, ArrowRight } from 'lucide-react';

const Step2RoundOperation = ({ 
  currentProblem,
  setCurrentStep,
  SBOX
}) => {

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <Settings className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ2: ラウンド操作</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">AES-128の10ラウンド処理</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">処理対象の暗号文</p>
            <p className="text-xl font-mono font-bold text-green-600 dark:text-green-400">{currentProblem.ciphertext}</p>
          </div>
        </div>

        {/* SubBytes説明 */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">1️⃣</span>
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200">SubBytes - バイト置換</h4>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">各バイトをS-Boxテーブルで別の値に置換します。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm mb-2">例: 文字「H」の変換</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">H (48)</span>
                <span>→</span>
                <span className="font-mono bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded font-bold">
                  {SBOX[0x48 % 32].toString(16).padStart(2, '0').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ShiftRows説明 */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">2️⃣</span>
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200">ShiftRows - 行シフト</h4>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">4×4行列の各行を左にシフトします。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-2">シフト前:</div>
                  <div className="font-mono space-y-1">
                    <div>A B C D</div>
                    <div>E F G H</div>
                    <div>I J K L</div>
                    <div>M N O P</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">シフト後:</div>
                  <div className="font-mono space-y-1">
                    <div>A B C D</div>
                    <div className="text-green-600 dark:text-green-400">F G H E</div>
                    <div className="text-green-600 dark:text-green-400">K L I J</div>
                    <div className="text-green-600 dark:text-green-400">P M N O</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MixColumns説明 */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">3️⃣</span>
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200">MixColumns - 列混合</h4>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">各列のバイトを数学的に混合して拡散効果を高めます。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                複雑な数学演算により、1バイトの変更が列全体に影響します。
              </div>
            </div>
          </div>
        </div>

        {/* AddRoundKey説明 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">4️⃣</span>
            <h4 className="text-lg font-semibold text-orange-800 dark:text-orange-200">AddRoundKey - 鍵加算</h4>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">各バイトとラウンドキーをXOR演算します。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">データ: A5</span>
                <span>⊕</span>
                <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">キー: 3F</span>
                <span>=</span>
                <span className="font-mono bg-orange-100 dark:bg-orange-800 px-2 py-1 rounded font-bold">9A</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentStep(3)}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            復号化に挑戦
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2RoundOperation;