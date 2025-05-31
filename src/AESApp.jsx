import React from 'react';
import { useDarkMode } from "./features/ui/hooks/useDarkMode.js";
import { useAESLearning } from './features/aes-learning/hooks/useAESLearning';

// UI Components
import StepIndicator from './features/ui/components/StepIndicator';

// Learning Step Components
import Step1Understanding from './features/aes-learning/components/Step1Understanding';
import Step2RoundOperation from './features/aes-learning/components/Step2RoundOperation';
import Step3Decryption from './features/aes-learning/components/Step3Decryption';
import Step4DecryptionDetails from './features/aes-learning/components/Step4DecryptionDetails';

export const AESApp = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    // State
    currentStep,
    currentProblem,
    currentProblemIndex,
    userPlaintext,
    helperRound,
    showHint,
    showSBox,
    showRounds,
    currentRound,
    decryptionCorrect,
    totalProblems,
    
    // Setters
    setCurrentStep,
    setUserPlaintext,
    setHelperRound,
    setShowHint,
    setShowSBox,
    setShowRounds,
    setCurrentRound,
    
    // Actions
    checkDecryption,
    getRoundResult,
    nextProblem,
    resetAll,
    handleEnterKey,
    
    // Utils
    stringToHex,
    aesOperations,
    SBOX,
    simpleAESDecrypt
  } = useAESLearning();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-6 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                🛡️
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  AES暗号学習
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  現代暗号の標準を学ぼう
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="glass p-3 rounded-2xl transition-all duration-300 hover:scale-110 border border-blue-200/50 dark:border-blue-500/30 group"
                title={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <button
                onClick={resetAll}
                className="glass px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 border border-blue-200/50 dark:border-blue-500/30 text-gray-700 dark:text-gray-300"
              >
                🔄 リセット
              </button>
            </div>
          </div>
        </div>

        {/* Step Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StepIndicator 
            step={1} 
            isActive={currentStep === 1} 
            isCompleted={currentStep > 1}
            title="理解"
          />
          <StepIndicator 
            step={2} 
            isActive={currentStep === 2} 
            isCompleted={currentStep > 2}
            title="ラウンド操作"
          />
          <StepIndicator 
            step={3} 
            isActive={currentStep === 3} 
            isCompleted={decryptionCorrect}
            title="復号化"
          />
          <StepIndicator 
            step={4} 
            isActive={currentStep === 4} 
            isCompleted={false}
            title="詳細手順"
          />
        </div>

        {/* Learning Steps */}
        {currentStep === 1 && (
          <Step1Understanding 
            setCurrentStep={setCurrentStep}
            showSBox={showSBox}
            setShowSBox={setShowSBox}
            stringToHex={stringToHex}
            SBOX={SBOX}
            aesOperations={aesOperations}
          />
        )}

        {currentStep === 2 && (
          <Step2RoundOperation 
            currentProblem={currentProblem}
            helperRound={helperRound}
            setHelperRound={setHelperRound}
            getRoundResult={getRoundResult}
            showRounds={showRounds}
            setShowRounds={setShowRounds}
            currentRound={currentRound}
            setCurrentRound={setCurrentRound}
            setCurrentStep={setCurrentStep}
            aesOperations={aesOperations}
            SBOX={SBOX}
          />
        )}

        {currentStep === 3 && (
          <Step3Decryption 
            currentProblem={currentProblem}
            currentProblemIndex={currentProblemIndex}
            totalProblems={totalProblems}
            userPlaintext={userPlaintext}
            setUserPlaintext={setUserPlaintext}
            checkDecryption={checkDecryption}
            decryptionCorrect={decryptionCorrect}
            showHint={showHint}
            setShowHint={setShowHint}
            showSBox={showSBox}
            setShowSBox={setShowSBox}
            handleEnterKey={handleEnterKey}
            nextProblem={nextProblem}
            resetAll={resetAll}
            SBOX={SBOX}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === 4 && (
          <Step4DecryptionDetails 
            currentProblem={currentProblem}
            SBOX={SBOX}
            simpleAESDecrypt={simpleAESDecrypt}
            resetAll={resetAll}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>
    </div>
  );
};