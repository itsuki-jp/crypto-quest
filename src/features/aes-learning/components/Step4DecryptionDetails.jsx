import React from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';

const Step4DecryptionDetails = ({ 
  currentProblem,
  resetAll,
  setCurrentStep
}) => {
  // 簡易復号化デモ
  const demonstrateDecryption = () => {
    const steps = [];
    const cipherHex = currentProblem.ciphertext;
    
    for (let i = 0; i < Math.min(32, cipherHex.length); i += 2) {
      const encryptedHex = cipherHex.substr(i, 2);
      const encrypted = parseInt(encryptedHex, 16);
      const keyChar = currentProblem.key.charCodeAt((i / 2) % currentProblem.key.length);
      
      // 逆操作の手順
      steps.push({
        step: (i / 2) + 1,
        encrypted: encryptedHex,
        keyByte: keyChar.toString(16).padStart(2, '0').toUpperCase(),
        afterXOR: (encrypted ^ keyChar).toString(16).padStart(2, '0').toUpperCase(),
        finalChar: String.fromCharCode(encrypted ^ keyChar)
      });
    }
    
    return steps;
  };

  const decryptionSteps = demonstrateDecryption();

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
          <BookOpen className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ4: 復号化詳細手順</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">AES復号化の実際の手順</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">なぜ推測で解けるのか？</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                この学習版では簡略化していますが、実際のAESは：<br/>
                • キーが分からないと復号化は不可能<br/>
                • 学習目的でキーを表示しているため推測できます<br/>
                • 現実では暗号文のみから平文を推測することは極めて困難
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">実際の復号化プロセス</h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-3">暗号文「{currentProblem.ciphertext}」の復号化</h4>
              <div className="space-y-2">
                {decryptionSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="w-8 text-center font-bold">{step.step}.</span>
                    <span className="font-mono">{step.encrypted}</span>
                    <span>⊕</span>
                    <span className="font-mono">{step.keyByte}</span>
                    <span>=</span>
                    <span className="font-mono">{step.afterXOR}</span>
                    <span>→</span>
                    <span className="font-bold text-green-600 dark:text-green-400">'{step.finalChar}'</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 rounded">
                <p className="font-medium text-green-800 dark:text-green-200">
                  結果: "{decryptionSteps.map(s => s.finalChar).join('')}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-orange-800 dark:text-orange-200">実際のAESとの違い</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">学習版（簡易版）</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 簡略化されたS-Box</li>
                <li>• 単純なXOR演算のみ</li>
                <li>• キーが表示される</li>
                <li>• 教育目的</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">実際のAES</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• 完全な256値S-Box</li>
                <li>• 10ラウンドの複雑な処理</li>
                <li>• キーは完全秘匿</li>
                <li>• 軍事レベルの暗号強度</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-800 dark:text-red-200">セキュリティの本質</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>重要なポイント:</strong><br/>
              • S-Boxは公開されていても問題ない<br/>
              • セキュリティは秘密キーの管理にかかっている<br/>
              • キーが漏洩しない限り、暗号文から平文を推測することは計算量的に不可能<br/>
              • 現代のコンピュータでも数百万年かかる計算が必要
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentStep(3)}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
            復号化に戻る
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            🏠 最初から学習
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4DecryptionDetails;