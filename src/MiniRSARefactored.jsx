import React from 'react';
import { useDarkMode } from './features/ui/hooks/useDarkMode.js';
import { useRSALearning } from './features/rsa-learning/hooks/useRSALearning.js';

// UI Components
import AppHeader from './features/ui/components/AppHeader.jsx';
import StepIndicator from './features/ui/components/StepIndicator.jsx';
import ParameterDisplay from './features/ui/components/ParameterDisplay.jsx';
import SuccessModal from './features/ui/components/SuccessModal.jsx';
import CalculatorWidget from './features/ui/components/CalculatorWidget.jsx';

// Learning Step Components
import Step1Information from './features/rsa-learning/components/Step1Information.jsx';
import Step2Factorization from './features/rsa-learning/components/Step2Factorization.jsx';
import Step3KeyCalculation from './features/rsa-learning/components/Step3KeyCalculation.jsx';
import Step4Decryption from './features/rsa-learning/components/Step4Decryption.jsx';

const MiniRSAApp = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const {
    // State
    currentStep,
    showHint,
    showHint2, 
    showHint3,
    p,
    q,
    phi,
    d,
    decryptedMessage,
    showDivisionHelper,
    divisionInput,
    showEuclidHelper,
    showCalculator,
    showModExpHelper,
    factorsCorrect,
    phiCorrect,
    dCorrect,
    showSuccessMessage,
    calcInput,
    calcResult,
    rsaProblem,
    
    // Setters
    setCurrentStep,
    setShowHint,
    setShowHint2,
    setShowHint3,
    setP,
    setQ,
    setPhi,
    setD,
    setDecryptedMessage,
    setShowDivisionHelper,
    setDivisionInput,
    setShowEuclidHelper,
    setShowCalculator,
    setShowModExpHelper,
    setCalcInput,
    setCalcResult,
    
    // Actions
    handleFactorCheck,
    handlePhiCheck,
    handleDCheck,
    handleDecryptionCheck,
    resetProblem,
    calculateExpression,
    handleEnterKey,
    
    // Checkers
    checkDecryption,
  } = useRSALearning();

  const { n, e, c, message: correctMessage } = rsaProblem;

  // Parameter display data
  const params = [];
  if (factorsCorrect) {
    params.push({ name: 'p', value: Math.min(parseInt(p), parseInt(q)) });
    params.push({ name: 'q', value: Math.max(parseInt(p), parseInt(q)) });
  }
  if (phiCorrect) {
    params.push({ name: 'φ(n)', value: phi });
  }
  if (dCorrect) {
    params.push({ name: 'd', value: d });
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <ParameterDisplay params={params} n={n} e={e} />
        
        <AppHeader 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          resetProblem={resetProblem}
          checkDecryption={checkDecryption}
          correctMessage={correctMessage}
        />

        <SuccessModal showSuccessMessage={showSuccessMessage} />

        {/* Step Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StepIndicator 
            step={1} 
            isActive={currentStep === 1} 
            isCompleted={currentStep > 1}
            title="情報確認"
          />
          <StepIndicator 
            step={2} 
            isActive={currentStep === 2} 
            isCompleted={factorsCorrect}
            title="因数分解"
          />
          <StepIndicator 
            step={3} 
            isActive={currentStep === 3} 
            isCompleted={phiCorrect && dCorrect}
            title="秘密鍵計算"
          />
          <StepIndicator 
            step={4} 
            isActive={currentStep === 4} 
            isCompleted={checkDecryption()}
            title="復号"
          />
        </div>

        <CalculatorWidget 
          showCalculator={showCalculator}
          calcInput={calcInput}
          setCalcInput={setCalcInput}
          handleEnterKey={handleEnterKey}
          calculateExpression={calculateExpression}
          calcResult={calcResult}
        />

        {/* Learning Steps */}
        {currentStep === 1 && (
          <Step1Information 
            n={n}
            e={e}
            c={c}
            showHint={showHint}
            setShowHint={setShowHint}
            setCurrentStep={setCurrentStep}
            setShowCalculator={setShowCalculator}
            showCalculator={showCalculator}
          />
        )}

        {currentStep === 2 && (
          <Step2Factorization 
            n={n}
            p={p}
            setP={setP}
            q={q}
            setQ={setQ}
            handleEnterKey={handleEnterKey}
            handleFactorCheck={handleFactorCheck}
            factorsCorrect={factorsCorrect}
            setCurrentStep={setCurrentStep}
            setShowCalculator={setShowCalculator}
            showCalculator={showCalculator}
            showDivisionHelper={showDivisionHelper}
            setShowDivisionHelper={setShowDivisionHelper}
            divisionInput={divisionInput}
            setDivisionInput={setDivisionInput}
          />
        )}

        {currentStep === 3 && (
          <Step3KeyCalculation 
            p={p}
            q={q}
            factorsCorrect={factorsCorrect}
            phi={phi}
            setPhi={setPhi}
            handleEnterKey={handleEnterKey}
            handlePhiCheck={handlePhiCheck}
            phiCorrect={phiCorrect}
            showHint2={showHint2}
            setShowHint2={setShowHint2}
            d={d}
            setD={setD}
            handleDCheck={handleDCheck}
            dCorrect={dCorrect}
            showHint3={showHint3}
            setShowHint3={setShowHint3}
            showEuclidHelper={showEuclidHelper}
            setShowEuclidHelper={setShowEuclidHelper}
            setCurrentStep={setCurrentStep}
            setShowCalculator={setShowCalculator}
            showCalculator={showCalculator}
            e={e}
          />
        )}

        {currentStep === 4 && (
          <Step4Decryption 
            c={c}
            d={d}
            n={n}
            dCorrect={dCorrect}
            decryptedMessage={decryptedMessage}
            setDecryptedMessage={setDecryptedMessage}
            handleEnterKey={handleEnterKey}
            handleDecryptionCheck={handleDecryptionCheck}
            checkDecryption={checkDecryption}
            correctMessage={correctMessage}
            showModExpHelper={showModExpHelper}
            setShowModExpHelper={setShowModExpHelper}
            resetProblem={resetProblem}
            setShowCalculator={setShowCalculator}
            showCalculator={showCalculator}
            calcResult={calcResult}
            setCalcResult={setCalcResult}
          />
        )}
      </div>
    </div>
  );
};

export default MiniRSAApp;
