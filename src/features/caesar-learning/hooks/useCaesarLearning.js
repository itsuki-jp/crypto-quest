import { useState, useCallback } from 'react';

// シーザー暗号の問題データ
const CAESAR_PROBLEMS = [
  {
    id: 1,
    plaintext: "HELLO",
    shift: 3,
    ciphertext: "KHOOR",
    hint: "アルファベットを3つ右にずらしてみましょう"
  },
  {
    id: 2,
    plaintext: "WORLD",
    shift: 5,
    ciphertext: "BTWQI",
    hint: "アルファベットを5つ右にずらしてみましょう"
  },
  {
    id: 3,
    plaintext: "CRYPTO",
    shift: 7,
    ciphertext: "JYFWAV",
    hint: "アルファベットを7つ右にずらしてみましょう"
  },
  {
    id: 4,
    plaintext: "SECURITY",
    shift: 13,
    ciphertext: "FRPHEVGL",
    hint: "ROT13という有名な暗号です"
  }
];

// シーザー暗号の変換関数
const caesarCipher = (text, shift) => {
  return text.toUpperCase().replace(/[A-Z]/g, char => {
    const code = char.charCodeAt(0) - 65;
    const shifted = (code + shift + 26) % 26;
    return String.fromCharCode(shifted + 65);
  });
};

// シーザー暗号の復号関数
const caesarDecipher = (text, shift) => {
  return caesarCipher(text, -shift);
};

export const useCaesarLearning = () => {
  // 現在のステップ (1: 理解, 2: 復号化, 3: チャレンジ)
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  
  // 入力値の状態
  const [userPlaintext, setUserPlaintext] = useState('');
  const [helperShift, setHelperShift] = useState('');
  const [customText, setCustomText] = useState('');
  const [customShift, setCustomShift] = useState('');
  
  // UI状態
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAlphabet, setShowAlphabet] = useState(false);
  
  // 正解チェック状態
  const [decryptionCorrect, setDecryptionCorrect] = useState(false);

  const currentProblem = CAESAR_PROBLEMS[currentProblemIndex];

  // アルファベット表の生成
  const generateAlphabet = useCallback((shift = 0) => {
    const normal = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const shifted = normal.map((_, i) => {
      const newIndex = (i + shift + 26) % 26;
      return normal[newIndex];
    });
    return { normal, shifted };
  }, []);

  // ヘルパーツールでシフト結果を表示
  const getHelperResult = useCallback(() => {
    if (!helperShift || !currentProblem.ciphertext) return '';
    const shift = parseInt(helperShift);
    return caesarDecipher(currentProblem.ciphertext, shift);
  }, [helperShift, currentProblem.ciphertext]);

  // 復号化チェック
  const checkDecryption = useCallback(() => {
    const result = caesarDecipher(currentProblem.ciphertext, currentProblem.shift);
    if (userPlaintext.toUpperCase() === result) {
      setDecryptionCorrect(true);
      return true;
    }
    return false;
  }, [userPlaintext, currentProblem]);

  // カスタム暗号化
  const encryptCustomText = useCallback(() => {
    if (!customText || !customShift) return '';
    const shift = parseInt(customShift);
    return caesarCipher(customText, shift);
  }, [customText, customShift]);

  // 次の問題へ
  const nextProblem = useCallback(() => {
    if (currentProblemIndex < CAESAR_PROBLEMS.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      resetCurrentProblem();
    }
  }, [currentProblemIndex]);

  // 前の問題へ
  const previousProblem = useCallback(() => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(prev => prev - 1);
      resetCurrentProblem();
    }
  }, [currentProblemIndex]);

  // 現在の問題をリセット
  const resetCurrentProblem = useCallback(() => {
    setUserPlaintext('');
    setHelperShift('');
    setShowHint(false);
    setShowAnswer(false);
    setShowSuccess(false);
    setDecryptionCorrect(false);
  }, []);

  // 全体リセット
  const resetAll = useCallback(() => {
    setCurrentStep(1);
    setCurrentProblemIndex(0);
    setCustomText('');
    setCustomShift('');
    setShowAlphabet(false);
    resetCurrentProblem();
  }, [resetCurrentProblem]);

  // Enterキーハンドリング
  const handleEnterKey = useCallback((e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  }, []);

  return {
    // State
    currentStep,
    currentProblem,
    currentProblemIndex,
    userPlaintext,
    helperShift,
    customText,
    customShift,
    showHint,
    showAnswer,
    showSuccess,
    showAlphabet,
    decryptionCorrect,
    
    // Setters
    setCurrentStep,
    setUserPlaintext,
    setHelperShift,
    setCustomText,
    setCustomShift,
    setShowHint,
    setShowAnswer,
    setShowSuccess,
    setShowAlphabet,
    
    // Actions
    checkDecryption,
    getHelperResult,
    encryptCustomText,
    nextProblem,
    previousProblem,
    resetCurrentProblem,
    resetAll,
    handleEnterKey,
    generateAlphabet,
    
    // Utils
    caesarCipher,
    caesarDecipher,
    
    // Constants
    totalProblems: CAESAR_PROBLEMS.length
  };
};
