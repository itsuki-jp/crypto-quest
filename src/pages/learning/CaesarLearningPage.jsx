import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CaesarApp from '../../CaesarApp.jsx';

const CaesarLearningPage = () => {
  return (
    <div className="min-h-screen">
      {/* ナビゲーションバー */}
      <div className="glass border-b border-blue-200/50 dark:border-blue-500/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
          <Link 
            to="/"
            className="flex items-center gap-2 glass px-4 py-2 rounded-xl border border-blue-200/50 dark:border-blue-500/30 hover:scale-105 transition-all duration-300 text-gray-900 dark:text-gray-100"
          >
            <ArrowLeft size={18} />
            ホームに戻る
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            / 体験学習 / シーザー暗号
          </div>
        </div>
      </div>
      
      {/* シーザー暗号学習コンテンツ */}
      <CaesarApp />
    </div>
  );
};

export default CaesarLearningPage;