import { useState } from 'react';
import { generateRSAProblem } from '../utils/rsaMath.js';

export const useRSALearning = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showHint, setShowHint] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showHint3, setShowHint3] = useState(false);
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [phi, setPhi] = useState('');
  const [d, setD] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [showDivisionHelper, setShowDivisionHelper] = useState(false);
  const [divisionInput, setDivisionInput] = useState('');
  const [showEuclidHelper, setShowEuclidHelper] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showModExpHelper, setShowModExpHelper] = useState(false);
  const [factorsCorrect, setFactorsCorrect] = useState(false);
  const [phiCorrect, setPhiCorrect] = useState(false);
  const [dCorrect, setDCorrect] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState('');
  
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  const [rsaProblem, setRsaProblem] = useState(() => generateRSAProblem());
  const { p: correctP, q: correctQ, d: correctD, phi: correctPhi, message: correctMessage } = rsaProblem;

  const checkFactors = () => {
    const pNum = parseInt(p);
    const qNum = parseInt(q);
    return pNum === correctP && qNum === correctQ || pNum === correctQ && qNum === correctP;
  };

  const checkPhi = () => {
    return parseInt(phi) === correctPhi;
  };

  const checkD = () => {
    return parseInt(d) === correctD;
  };

  const checkDecryption = () => {
    return parseInt(decryptedMessage) === correctMessage;
  };

  const handleFactorCheck = () => {
    if (checkFactors()) {
      setFactorsCorrect(true);
      setShowSuccessMessage('✅ 正解です！🎉 p と q が正しく見つかりました！');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    } else {
      setShowSuccessMessage('❌ もう一度確認してみてください');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    }
  };

  const handlePhiCheck = () => {
    if (checkPhi()) {
      setPhiCorrect(true);
      setShowSuccessMessage('✅ 正解です！🎉 φ(n) が正しく計算されました！');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    } else {
      setShowSuccessMessage('❌ もう一度計算してみてください');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    }
  };

  const handleDCheck = () => {
    if (checkD()) {
      setDCorrect(true);
      setShowSuccessMessage('✅ 正解です！🎉 秘密鍵 d が正しく見つかりました！');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    } else {
      setShowSuccessMessage('❌ もう一度確認してみてください');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    }
  };

  const handleDecryptionCheck = () => {
    if (checkDecryption()) {
      setShowSuccessMessage(`✅ 正解です！🎉\n復号された値: ${correctMessage}\nこれはASCII文字 '${String.fromCharCode(correctMessage)}' です！`);
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } else {
      setShowSuccessMessage('❌ もう一度計算してみてください');
      setTimeout(() => setShowSuccessMessage(''), 2000);
    }
  };

  const resetProblem = () => {
    setRsaProblem(generateRSAProblem());
    setCurrentStep(1);
    setFactorsCorrect(false);
    setPhiCorrect(false);
    setDCorrect(false);
    setP('');
    setQ('');
    setPhi('');
    setD('');
    setDecryptedMessage('');
    setShowSuccessMessage('');
    setShowHint(false);
    setShowHint2(false);
    setShowHint3(false);
    setDivisionInput('');
    setShowEuclidHelper(false);
    setShowDivisionHelper(false);
    setDivisionInput('');
  };

  const calculateExpression = () => {
    try {
      const result = Function('"use strict"; return (' + calcInput + ')')();
      setCalcResult(result.toString());
    } catch {
      setCalcResult('エラー');
    }
  };

  const handleEnterKey = (e, checkFunction) => {
    if (e.key === 'Enter') {
      checkFunction();
    }
  };

  return {
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
    checkFactors,
    checkPhi,
    checkD,
    checkDecryption,
  };
};
