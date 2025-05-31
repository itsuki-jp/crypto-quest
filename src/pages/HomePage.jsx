import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Key, ArrowRight, Sparkles } from 'lucide-react';
import { useDarkMode } from '../features/ui/hooks/useDarkMode.js';
import { Sun, Moon } from 'lucide-react';

const HomePage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-6 mb-12 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Crypto Quest
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  暗号技術を学ぼう・体験しよう
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="glass p-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-blue-200/50 dark:border-blue-500/30 group"
              title={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            >
              {isDarkMode ? (
                <Sun className="text-yellow-400 group-hover:text-yellow-300 transition-colors" size={24} />
              ) : (
                <Moon className="text-blue-600 group-hover:text-blue-500 transition-colors" size={24} />
              )}
            </button>
          </div>

          <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed">
            現代社会を支える暗号技術を、インタラクティブな学習体験で理解しましょう。
            初心者から上級者まで、楽しく学べる暗号の世界へようこそ！
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 体験学習セクション */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-slide-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">体験学習</h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              ステップバイステップで暗号アルゴリズムを理解し、実際に暗号化・復号を体験できます。
            </p>

            <div className="space-y-4">
              {/* RSA学習カード */}
              <Link 
                to="/learning/rsa"
                className="group block glass p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300 interactive"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Key className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        RSA暗号
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        公開鍵暗号の基礎を学ぼう
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" size={20} />
                </div>
              </Link>

              {/* シーザー暗号学習カード */}
              <Link 
                to="/learning/caesar"
                className="group block glass p-6 rounded-2xl border border-blue-200/50 dark:border-blue-500/30 hover:scale-105 hover:shadow-xl transition-all duration-300 interactive"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🔤</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        シーザー暗号
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        古典暗号の基礎を学ぼう
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" size={20} />
                </div>
              </Link>

              <div className="glass p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/30 opacity-60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                      <Key className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                        AES暗号
                      </h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500">
                        現代の共通鍵暗号 - 準備中
                      </p>
                    </div>
                  </div>
                  <Sparkles className="text-gray-300" size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* 暗号化ツールセクション */}
          <div className="glass rounded-3xl p-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30 animate-slide-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={24} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">暗号化ツール</h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              様々な暗号アルゴリズムを使って、実際に文章やデータを暗号化・復号してみましょう。
            </p>

            <div className="glass p-6 rounded-2xl border border-gray-200/50 dark:border-gray-600/30 opacity-60">
              <div className="text-center">
                <Sparkles className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  準備中
                </h3>
                <p className="text-gray-400 dark:text-gray-500">
                  様々な暗号化ツールを準備しています
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="glass rounded-2xl p-6 backdrop-blur-xl shadow-xl border border-blue-200/50 dark:border-blue-500/30 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            暗号技術を学んで、デジタル時代のセキュリティを理解しよう 🔐
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
