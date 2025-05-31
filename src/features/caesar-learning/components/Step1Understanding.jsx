import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const Step1Understanding = ({ 
  setCurrentStep, 
  showAlphabet, 
  setShowAlphabet, 
  generateAlphabet 
}) => {
  const { normal, shifted } = generateAlphabet(3);

  return (
    <div className="glass rounded-3xl p-8 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <BookOpen className="text-white" size={24} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">ステップ1: シーザー暗号とは</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-200">シーザー暗号の基本</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>シーザー暗号は、古代ローマの皇帝ユリウス・カエサル（シーザー）が使ったとされる暗号です。</p>
            <p>アルファベットの各文字を一定の数だけずらして別の文字に置き換えます。</p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="font-semibold text-blue-800 dark:text-blue-200">例: 3文字右にずらす場合</p>
              <p>A → D, B → E, C → F, ... , X → A, Y → B, Z → C</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-green-800 dark:text-green-200">暗号化の手順</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>元の文字（平文）を決める</li>
              <li>ずらす数（シフト値）を決める</li>
              <li>各文字をシフト値分右にずらす</li>
              <li>暗号文の完成</li>
            </ol>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-3 text-orange-800 dark:text-orange-200">復号化の手順</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>暗号文を受け取る</li>
              <li>シフト値を知る（または推測）</li>
              <li>各文字をシフト値分左にずらす</li>
              <li>元の文字（平文）に戻る</li>
            </ol>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200">アルファベット対応表（シフト3の例）</h4>
            <button
              onClick={() => setShowAlphabet(!showAlphabet)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showAlphabet ? '隠す' : '表示する'}
            </button>
          </div>
          
          {showAlphabet && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">元のアルファベット:</p>
                <div className="flex flex-wrap gap-2">
                  {normal.map((letter, index) => (
                    <div key={index} className="w-8 h-8 bg-white dark:bg-gray-700 border border-purple-300 dark:border-purple-600 rounded flex items-center justify-center text-sm font-mono">
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">3つずらした後:</p>
                <div className="flex flex-wrap gap-2">
                  {shifted.map((letter, index) => (
                    <div key={index} className="w-8 h-8 bg-purple-100 dark:bg-purple-800 border border-purple-300 dark:border-purple-600 rounded flex items-center justify-center text-sm font-mono font-bold">
                      {letter}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setCurrentStep(2)}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            復号化を体験する
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1Understanding;