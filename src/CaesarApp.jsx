import { useDarkMode } from "./features/ui/hooks/useDarkMode.js";
import { useCaesarLearning } from "./features/caesar-learning/hooks/useCaesarLearning.js";

// UI Components
import StepIndicator from "./features/ui/components/StepIndicator.jsx";

// Learning Step Components
import Step1Understanding from "./features/caesar-learning/components/Step1Understanding.jsx";
import { Step2Decryption } from "./features/caesar-learning/components/Step2Decryption.jsx";
import { Step3Challenge } from "./features/caesar-learning/components/Step3Challenge.jsx";


const CaesarApp = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    // State
    currentStep,
    currentProblem,
    currentProblemIndex,
    userPlaintext,
    helperShift,
    showHint,
    showAlphabet,
    decryptionCorrect,
    totalProblems,
    
    // Setters
    setCurrentStep,
    setUserPlaintext,
    setHelperShift,
    setShowHint,
    setShowAlphabet,
    
    // Actions
    checkDecryption,
    getHelperResult,
    nextProblem,
    resetAll,
    handleEnterKey,
    generateAlphabet
  } = useCaesarLearning();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass rounded-3xl p-6 mb-8 backdrop-blur-xl shadow-2xl border border-blue-200/50 dark:border-blue-500/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl">
                🔤
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  シーザー暗号学習
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-1">
                  古典暗号の基礎を学ぼう
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StepIndicator 
            step={1} 
            isActive={currentStep === 1} 
            isCompleted={currentStep > 1}
            title="理解"
          />
          <StepIndicator 
            step={2} 
            isActive={currentStep === 2} 
            isCompleted={decryptionCorrect}
            title="復号化"
          />
        </div>

        {/* Learning Steps */}
        {currentStep === 1 && (
          <Step1Understanding 
            setCurrentStep={setCurrentStep}
            showAlphabet={showAlphabet}
            setShowAlphabet={setShowAlphabet}
            generateAlphabet={generateAlphabet}
          />
        )}

        {currentStep === 2 && (
          <Step2Decryption 
            currentProblem={currentProblem}
            currentProblemIndex={currentProblemIndex}
            totalProblems={totalProblems}
            userPlaintext={userPlaintext}
            setUserPlaintext={setUserPlaintext}
            helperShift={helperShift}
            setHelperShift={setHelperShift}
            checkDecryption={checkDecryption}
            decryptionCorrect={decryptionCorrect}
            showHint={showHint}
            setShowHint={setShowHint}
            setCurrentStep={setCurrentStep}
            handleEnterKey={handleEnterKey}
            getHelperResult={getHelperResult}
            nextProblem={nextProblem}
          />
        )}
      </div>
    </div>
  );
};

export default CaesarApp;