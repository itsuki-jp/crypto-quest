import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const Step1Understanding = ({ 
  setCurrentStep, 
  showSBox,
  setShowSBox,
  stringToHex,
  SBOX,
  aesOperations
}) => {
  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <BookOpen className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ1: AES暗号とは</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">AESの基本</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>AES（Advanced Encryption Standard）は現代の標準共通鍵暗号方式です。</p>
            <p>128ビットのデータブロックを128/192/256ビットの鍵で暗号化し、10-14回のラウンド処理を行います。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-blue-800 dark:text-blue-200">AES-128の特徴</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>ブロック長: 128ビット（16バイト）</li>
                <li>鍵長: 128ビット</li>
                <li>ラウンド数: 10回</li>
                <li>4×4バイト行列で処理</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-200">各ラウンドの4つの操作</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {Object.entries(aesOperations).map(([key, desc], index) => (
                <li key={key}>{desc}</li>
              ))}
            </ol>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-200">実用性</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>HTTPS通信で使用</li>
              <li>WiFiのWPA2/WPA3</li>
              <li>ファイル暗号化</li>
              <li>政府標準暗号</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200">S-Box置換の例</h4>
            <button
              onClick={() => setShowSBox(!showSBox)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showSBox ? '隠す' : '表示する'}
            </button>
          </div>
          
          {showSBox && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-3">文字「H」の変換例</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">H</span> → 
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ASCII: 72</span> → 
                    <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">16進: 48</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>S-Box[72 % 32] =</span>
                    <span className="font-mono bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded font-bold">
                      {SBOX[72 % 32].toString(16).padStart(2, '0').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">S-Box（簡易版）:</p>
                <div className="grid grid-cols-8 gap-1 text-xs font-mono">
                  {SBOX.slice(0, 32).map((value, index) => (
                    <div 
                      key={index} 
                      className={`p-1 text-center rounded transition-colors ${
                        index === 72 % 32 
                          ? 'bg-purple-500 text-white font-bold' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      {value.toString(16).padStart(2, '0').toUpperCase()}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                  各バイトをこの表で置換します。ハイライトされた値が「H」の変換結果です。
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            ラウンド操作を学ぶ
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Understanding;