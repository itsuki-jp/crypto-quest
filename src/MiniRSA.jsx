import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, EyeOff, Check, X, Calculator, Book, Hash } from 'lucide-react';

const MiniRSAApp = () => {
  // RSA Problem Generator
  const generateRSAProblem = () => {
    // Small primes for educational purposes
    const smallPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    
    // Pick two different primes
    const p = smallPrimes[Math.floor(Math.random() * smallPrimes.length)];
    let q;
    do {
      q = smallPrimes[Math.floor(Math.random() * smallPrimes.length)];
    } while (q === p);
    
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    
    // Find a suitable e (coprime to phi)
    const findE = () => {
      const candidates = [3, 5, 7, 11, 13, 17, 19, 23];
      for (let candidate of candidates) {
        if (candidate < phi && gcd(candidate, phi) === 1) {
          return candidate;
        }
      }
      return 3; // fallback
    };
    
    const e = findE();
    
    // Find d using extended Euclidean algorithm
    const d = modInverse(e, phi);
    
    // Generate a random message (ASCII printable characters 32-126)
    const message = Math.floor(Math.random() * 95) + 32; // ASCII 32-126
    
    // Encrypt the message
    const c = modPow(message, e, n);
    
    return { p, q, n, e, d, phi, message, c };
  };
  
  // Helper functions
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  const modInverse = (a, m) => {
    // Extended Euclidean Algorithm
    const extGcd = (a, b) => {
      if (a === 0) return [b, 0, 1];
      const [gcd, x1, y1] = extGcd(b % a, a);
      const x = y1 - Math.floor(b / a) * x1;
      const y = x1;
      return [gcd, x, y];
    };
    
    const [, x] = extGcd(a % m, m);
    return ((x % m) + m) % m;
  };
  
  const modPow = (base, exponent, modulus) => {
    let result = 1;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }
    return result;
  };

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
  
  // Calculator state
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('');

  // RSA parameters - initialize with a problem
  const [rsaProblem, setRsaProblem] = useState(() => generateRSAProblem());
  const { p: correctP, q: correctQ, n, e, d: correctD, phi: correctPhi, message: correctMessage, c } = rsaProblem;

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

  const handleEnterKey = (e, checkFunction) => {
    if (e.key === 'Enter') {
      checkFunction();
    }
  };

  const getDivisionTable = (number = n) => {
    const num = parseInt(number) || n;
    const results = [];
    for (let i = 2; i <= Math.sqrt(num); i++) {
      results.push({
        divisor: i,
        quotient: Math.floor(num / i),
        remainder: num % i,
        isDivisor: num % i === 0
      });
    }
    return results;
  };

  const calculateExpression = () => {
    try {
      // Simple calculator - be careful with eval in production
      const result = Function('"use strict"; return (' + calcInput + ')')();
      setCalcResult(result.toString());
    } catch {
      setCalcResult('エラー');
    }
  };

  const calculateModularExponentiation = (base, exponent, modulus) => {
    return modPow(base, exponent, modulus);
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

  const StepIndicator = ({ step, isActive, isCompleted, title }) => (
    <div className={`flex items-center p-3 rounded-lg border-2 transition-all ${
      isActive ? 'border-blue-500 bg-blue-50' : 
      isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
        isActive ? 'bg-blue-500 text-white' : 
        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
      }`}>
        {isCompleted ? <Check size={16} /> : step}
      </div>
      <span className="ml-3 font-medium">{title}</span>
    </div>
  );

  const ParameterDisplay = () => {
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

    if (params.length === 0) return null;

    return (
      <div className="fixed top-4 right-4 bg-white border-2 border-gray-300 rounded-lg p-3 shadow-lg">
        <h4 className="font-bold text-sm mb-2">📝 求めた値</h4>
        <div className="text-sm space-y-1">
          <div>n = {n}</div>
          <div>e = {e}</div>
          {params.map((param, i) => (
            <div key={i}>{param.name} = {param.value}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <ParameterDisplay />
      
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        🔐 Mini-RSA 体験型学習
      </h1>
      
      <div className="text-center mb-8">
        <button
          onClick={resetProblem}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          🎲 新しい問題を生成
        </button>
        {checkDecryption() && (
          <p className="text-sm text-gray-600 mt-2">
            暗号化されていた文字: '<strong>{String.fromCharCode(correctMessage)}</strong>' (ASCII: {correctMessage})
          </p>
        )}
      </div>

      {/* Success Message - Modal Style */}
      {showSuccessMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-xl max-w-md mx-4 ${
            showSuccessMessage.includes('✅') ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
          }`}>
            <div className={`text-lg font-bold text-center ${
              showSuccessMessage.includes('✅') ? 'text-green-800' : 'text-red-800'
            }`}>
              {showSuccessMessage.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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

      {/* Calculator */}
      {showCalculator && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Calculator size={16} />
            🧮 電卓
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={calcInput}
              onChange={(e) => setCalcInput(e.target.value)}
              onKeyDown={(e) => handleEnterKey(e, calculateExpression)}
              placeholder="例: 12 * 10, 120 / 7, 143 % 11"
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={calculateExpression}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              計算
            </button>
          </div>
          {calcResult && (
            <div className="mt-2 p-2 bg-white border rounded">
              結果: {calcResult}
            </div>
          )}
        </div>
      )}

      {/* Step 1: Key Information */}
      {currentStep === 1 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">🪪 ステップ1: 与えられた情報</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-bold text-lg mb-3">🔑 公開鍵 (n, e)</h3>
              <div className="text-xl">
                <div>n = <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{n}</span></div>
                <div>e = <span className="font-mono bg-yellow-100 px-2 py-1 rounded">{e}</span></div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-bold text-lg mb-3">🔐 暗号文</h3>
              <div className="text-xl">
                c = <span className="font-mono bg-red-100 px-2 py-1 rounded">{c}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-lg border border-amber-300 transition-colors"
            >
              {showHint ? <EyeOff size={16} /> : <Eye size={16} />}
              💬 ヒントを見る
            </button>
            
            {showHint && (
              <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800">
                  💡 <strong>ヒント:</strong> nは2つの素数の積です。この2つの素数を見つけることから始めましょう！
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              次のステップへ →
            </button>
            
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              電卓
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Factor Finding */}
      {currentStep === 2 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">🧠 ステップ2: p, q を求めよう</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              n = {n} を2つの素数の積に分解してください: n = p × q
            </p>
            
            <div className="flex gap-4 items-center flex-wrap">
              <div>
                <label className="block text-sm font-medium mb-1">p =</label>
                <input
                  type="number"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, handleFactorCheck)}
                  className="w-20 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="?"
                />
              </div>
              
              <div className="text-xl">×</div>
              
              <div>
                <label className="block text-sm font-medium mb-1">q =</label>
                <input
                  type="number"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, handleFactorCheck)}
                  className="w-20 p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="?"
                />
              </div>

              <button
                onClick={handleFactorCheck}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ チェック
              </button>
            </div>
          </div>

          {/* Division Helper */}
          <div className="mb-6">
            <button
              onClick={() => setShowDivisionHelper(!showDivisionHelper)}
              className="flex items-center gap-2 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg border border-purple-300 transition-colors"
            >
              <Calculator size={16} />
              {showDivisionHelper ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              🧩 割り算支援ツール
            </button>

            {showDivisionHelper && (
              <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-bold mb-3">🧮 割り算支援ツール</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    因数分解したい数を入力してください：
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={divisionInput}
                      onChange={(e) => setDivisionInput(e.target.value)}
                      placeholder="例: 143, 77, 221 など"
                      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={() => setDivisionInput(n.toString())}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                    >
                      n={n}を使用
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    💡 ヒント: まずは問題のnを入力してみましょう（n = {n}）
                  </p>
                </div>
                
                {divisionInput && parseInt(divisionInput) > 1 && (
                  <div>
                    <h5 className="font-semibold mb-2">
                      {divisionInput} の約数チェック
                    </h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-gray-100">
                            <th className="text-left p-2">割る数</th>
                            <th className="text-left p-2">商</th>
                            <th className="text-left p-2">余り</th>
                            <th className="text-left p-2">約数？</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDivisionTable(divisionInput).map((row, i) => (
                            <tr key={i} className={`border-b ${row.isDivisor ? 'bg-yellow-100' : ''}`}>
                              <td className="p-2">{divisionInput} ÷ {row.divisor}</td>
                              <td className="p-2">{row.quotient}</td>
                              <td className="p-2">{row.remainder}</td>
                              <td className="p-2">
                                {row.isDivisor ? '✅ はい' : '❌ いいえ'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {getDivisionTable(divisionInput).filter(row => row.isDivisor).length > 0 && (
                      <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm font-medium text-yellow-800">
                          🎯 見つかった約数: {getDivisionTable(divisionInput)
                            .filter(row => row.isDivisor)
                            .map(row => `${row.divisor} × ${row.quotient} = ${divisionInput}`)
                            .join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {divisionInput && parseInt(divisionInput) <= 1 && (
                  <div className="p-3 bg-gray-100 border border-gray-300 rounded">
                    <p className="text-sm text-gray-600">
                      1より大きい数を入力してください
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {factorsCorrect && (
              <button
                onClick={() => setCurrentStep(3)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                次のステップへ →
              </button>
            )}
            
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              電卓
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Calculate φ(n) and d */}
      {currentStep === 3 && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">🔧 ステップ3: φ(n), d を求めよう</h2>
          
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">φ(n) の計算</h3>
            
            <button
              onClick={() => setShowHint2(!showHint2)}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 px-3 py-2 rounded-lg border border-amber-300 transition-colors mb-3"
            >
              {showHint2 ? <EyeOff size={16} /> : <Eye size={16} />}
              💡 ヒント1を見る
            </button>
            
            {showHint2 && factorsCorrect && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800">
                  💡 <strong>ヒント1:</strong> φ(n) = (p-1)(q-1) = ({Math.min(parseInt(p), parseInt(q))}-1)({Math.max(parseInt(p), parseInt(q))}-1)
                </p>
              </div>
            )}
            
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium mb-1">φ(n) =</label>
                <input
                  type="number"
                  value={phi}
                  onChange={(e) => setPhi(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, handlePhiCheck)}
                  className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="?"
                />
              </div>
              
              <button
                onClick={handlePhiCheck}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ チェック
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-3">秘密鍵 d の計算</h3>
            
            <button
              onClick={() => setShowHint3(!showHint3)}
              className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 px-3 py-2 rounded-lg border border-amber-300 transition-colors mb-3"
            >
              {showHint3 ? <EyeOff size={16} /> : <Eye size={16} />}
              💡 ヒント2を見る
            </button>
            
            {showHint3 && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800">
                  💡 <strong>ヒント2:</strong> d × e ≡ 1 (mod φ(n)) となる d を求めます<br/>
                  {phiCorrect ? `つまり、d × ${e} ≡ 1 (mod ${phi}) となる d を見つけましょう` : 'まずφ(n)を正しく求めてください'}
                </p>
              </div>
            )}
            
            <div className="flex gap-4 items-center">
              <div>
                <label className="block text-sm font-medium mb-1">d =</label>
                <input
                  type="number"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, handleDCheck)}
                  className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="?"
                />
              </div>
              
              <button
                onClick={handleDCheck}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ チェック
              </button>
            </div>
          </div>

          {/* Extended Euclidean Helper */}
          <div className="mb-6">
            <button
              onClick={() => setShowEuclidHelper(!showEuclidHelper)}
              className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-lg border border-indigo-300 transition-colors"
            >
              <Book size={16} />
              {showEuclidHelper ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              🧠 拡張ユークリッド補助
            </button>

            {showEuclidHelper && phiCorrect && (
              <div className="mt-3 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-bold mb-3">拡張ユークリッド互除法の使い方</h4>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>目標:</strong> {phi} × s + {e} × t = 1 となる t を求める（t が d になります）
                  </p>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold mb-2">ステップ1: ユークリッド互除法</p>
                    <div className="space-y-1">
                      <div>{phi} = {Math.floor(phi/e)} × {e} + {phi % e}</div>
                      <div>{e} = {Math.floor(e/(phi % e))} × {phi % e} + {e % (phi % e)}</div>
                      <div>...</div>
                      <div>最終的に gcd = 1 になることを確認</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold mb-2">ステップ2: 逆算</p>
                    <p>上記の式を逆算して、1 = {phi} × s + {e} × t の形にします</p>
                    <p>この時の t が求める d です</p>
                  </div>
                  
                  <div className="bg-yellow-100 p-3 rounded border border-yellow-300">
                    <p className="font-semibold">簡単な方法:</p>
                    <p>d = 1, 2, 3, ... を順番に試して、(d × {e}) mod {phi} = 1 になる d を見つける</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {phiCorrect && dCorrect && (
              <button
                onClick={() => setCurrentStep(4)}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                次のステップへ →
              </button>
            )}
            
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              電卓
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Decryption */}
      {currentStep === 4 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border">
          <h2 className="text-2xl font-bold mb-6">🧮 ステップ4: 復号に挑戦</h2>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              暗号文 c = {c} を復号してください<br/>
              復号式: m = c<sup>d</sup> mod n = {c}<sup>{dCorrect ? d : '?'}</sup> mod {n}
            </p>
            
            <div className="flex gap-4 items-center mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">復号した値 m =</label>
                <input
                  type="number"
                  value={decryptedMessage}
                  onChange={(e) => setDecryptedMessage(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, handleDecryptionCheck)}
                  className="w-24 p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="?"
                />
              </div>
              
              <button
                onClick={handleDecryptionCheck}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ 復号チェック
              </button>
            </div>

            {/* Modular Exponentiation Helper */}
            <button
              onClick={() => setShowModExpHelper(!showModExpHelper)}
              className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-lg border border-orange-300 transition-colors mb-4"
            >
              <Hash size={16} />
              {showModExpHelper ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              🧮 大きな数の mod 計算ツール
            </button>

            {showModExpHelper && dCorrect && (
              <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-bold mb-3">{c}^{d} mod {n} の計算</h4>
                <p className="text-sm text-gray-600 mb-3">
                  大きな指数の mod 計算を効率的に行います
                </p>
                
                <button
                  onClick={() => {
                    const result = calculateModularExponentiation(c, parseInt(d), n);
                    setCalcResult(`${c}^${d} mod ${n} = ${result}`);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  計算実行
                </button>
                
                {calcResult && calcResult.includes('mod') && (
                  <div className="mt-3 p-3 bg-white border rounded-lg">
                    <strong>計算結果:</strong> {calcResult}
                  </div>
                )}
              </div>
            )}
          </div>

          {checkDecryption() && (
            <div className="bg-green-100 border border-green-300 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-green-800 mb-2">🎉 おめでとうございます！</h3>
              <p className="text-green-700">
                RSA暗号の復号に成功しました！<br/>
                復号された値 {correctMessage} は、ASCII文字 '<strong>{String.fromCharCode(correctMessage)}</strong>' を表しています。
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={resetProblem}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              新しい問題に挑戦
            </button>
            
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculator size={16} />
              電卓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniRSAApp;