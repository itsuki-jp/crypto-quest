// RSA暗号に関する数学的な関数群

export const gcd = (a, b) => {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};

export const modInverse = (a, m) => {
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

export const modPow = (base, exponent, modulus) => {
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

export const generateRSAProblem = () => {
  const smallPrimes = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  
  const p = smallPrimes[Math.floor(Math.random() * smallPrimes.length)];
  let q;
  do {
    q = smallPrimes[Math.floor(Math.random() * smallPrimes.length)];
  } while (q === p);
  
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  
  const findE = () => {
    const candidates = [3, 5, 7, 11, 13, 17, 19, 23];
    for (let candidate of candidates) {
      if (candidate < phi && gcd(candidate, phi) === 1) {
        return candidate;
      }
    }
    return 3;
  };
  
  const e = findE();
  const d = modInverse(e, phi);
  const message = Math.floor(Math.random() * 95) + 32;
  const c = modPow(message, e, n);
  
  return { p, q, n, e, d, phi, message, c };
};

export const getDivisionTable = (number) => {
  const num = parseInt(number);
  if (!num || num <= 1) return [];
  
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
