import { useState, useCallback } from 'react';

// AES学習用の問題データ
const AES_PROBLEMS = [
  {
    id: 1,
    plaintext: "HELLO WORLD 2024",
    key: "MYSECRET",
    ciphertext: "051C1F090C72121B1F15176571627760",
    description: "基本的な16文字平文"
  },
  {
    id: 2,
    plaintext: "SECURITY IS COOL",
    key: "ADVANCED_KEY_128",
    ciphertext: "120115141C0A111D7F0216791C7E7D74",
    description: "セキュリティメッセージ"
  },
  {
    id: 3,
    plaintext: "AES ENCRYPTION!",
    key: "STRONG_PASSWORD1",
    ciphertext: "1211016F0B091C021803071E001C65",
    description: "AES暗号に関する文"
  }
];

// S-Box（簡易版）
const SBOX = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0
];

// AESの基本操作（教育用簡易版）
const hexToBinary = (hex) => {
  return hex.split('').map(h => 
    parseInt(h, 16).toString(2).padStart(4, '0')
  ).join('');
};

const stringToHex = (str) => {
  return str.split('').map(char => 
    char.charCodeAt(0).toString(16).padStart(2, '0')
  ).join('').toUpperCase();
};

// 簡易的なAES暗号化（教育目的）
const simpleAESEncrypt = (plaintext, key) => {
  let result = '';
  for (let i = 0; i < Math.min(plaintext.length, 16); i++) {
    const plainChar = plaintext.charCodeAt(i);
    const keyChar = key.charCodeAt(i % key.length);
    const encrypted = plainChar ^ keyChar; // XOR only for consistency with decryption
    result += encrypted.toString(16).padStart(2, '0').toUpperCase();
  }
  return result.padEnd(32, '0');
};

const simpleAESDecrypt = (ciphertext, key) => {
  let result = '';
  for (let i = 0; i < ciphertext.length; i += 2) {
    const encryptedHex = ciphertext.substr(i, 2);
    const encrypted = parseInt(encryptedHex, 16);
    const keyChar = key.charCodeAt((i / 2) % key.length);
    const decrypted = encrypted ^ keyChar;
    if (decrypted > 0) {
      result += String.fromCharCode(decrypted);
    }
  }
  return result.replace(/\0/g, '').trim();
};

export const useAESLearning = () => {
  // 現在のステップ (1: 理解, 2: ラウンド操作, 3: 復号化)
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  
  // 入力値の状態
  const [userPlaintext, setUserPlaintext] = useState('');
  const [helperRound, setHelperRound] = useState('');
  const [customPlaintext, setCustomPlaintext] = useState('');
  const [customKey, setCustomKey] = useState('');
  
  // UI状態
  const [showHint, setShowHint] = useState(false);
  const [showSBox, setShowSBox] = useState(false);
  const [showRounds, setShowRounds] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  
  // 正解チェック状態
  const [decryptionCorrect, setDecryptionCorrect] = useState(false);

  const currentProblem = AES_PROBLEMS[currentProblemIndex];

  // ラウンド処理結果を取得
  const getRoundResult = useCallback(() => {
    if (!helperRound || !currentProblem.ciphertext) return '';
    const round = parseInt(helperRound);
    if (round < 1 || round > 10) return '';
    
    // 簡易的なラウンド処理シミュレーション
    let tempResult = currentProblem.ciphertext;
    for (let i = 0; i < round; i++) {
      tempResult = tempResult.split('').reverse().join('');
    }
    return tempResult;
  }, [helperRound, currentProblem.ciphertext]);

  // 復号化チェック
  const checkDecryption = useCallback(() => {
    if (userPlaintext.toUpperCase().trim() === currentProblem.plaintext.toUpperCase().trim()) {
      setDecryptionCorrect(true);
      return true;
    }
    return false;
  }, [userPlaintext, currentProblem.plaintext]);

  // カスタム暗号化
  const encryptCustomText = useCallback(() => {
    if (!customPlaintext || !customKey) return '';
    return simpleAESEncrypt(customPlaintext, customKey);
  }, [customPlaintext, customKey]);

  // 次の問題へ
  const nextProblem = useCallback(() => {
    if (currentProblemIndex < AES_PROBLEMS.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      resetCurrentProblem();
    }
  }, [currentProblemIndex, resetCurrentProblem]);

  // 現在の問題をリセット
  const resetCurrentProblem = useCallback(() => {
    setUserPlaintext('');
    setHelperRound('');
    setShowHint(false);
    setShowSBox(false);
    setShowRounds(false);
    setCurrentRound(0);
    setDecryptionCorrect(false);
  }, []);

  // 全体リセット
  const resetAll = useCallback(() => {
    setCurrentStep(1);
    setCurrentProblemIndex(0);
    setCustomPlaintext('');
    setCustomKey('');
    resetCurrentProblem();
  }, [resetCurrentProblem]);

  // Enterキーハンドリング
  const handleEnterKey = useCallback((e, action) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  }, []);

  // AESの4つの操作
  const aesOperations = {
    subBytes: "各バイトをS-Boxで置換",
    shiftRows: "行を左にシフト",
    mixColumns: "列の混合変換",
    addRoundKey: "ラウンドキーとXOR"
  };

  return {
    // State
    currentStep,
    currentProblem,
    currentProblemIndex,
    userPlaintext,
    helperRound,
    customPlaintext,
    customKey,
    showHint,
    showSBox,
    showRounds,
    currentRound,
    decryptionCorrect,
    
    // Setters
    setCurrentStep,
    setUserPlaintext,
    setHelperRound,
    setCustomPlaintext,
    setCustomKey,
    setShowHint,
    setShowSBox,
    setShowRounds,
    setCurrentRound,
    
    // Actions
    checkDecryption,
    getRoundResult,
    encryptCustomText,
    nextProblem,
    resetCurrentProblem,
    resetAll,
    handleEnterKey,
    
    // Utils
    simpleAESEncrypt,
    simpleAESDecrypt,
    hexToBinary,
    stringToHex,
    aesOperations,
    SBOX,
    
    // Constants
    totalProblems: AES_PROBLEMS.length
  };
};