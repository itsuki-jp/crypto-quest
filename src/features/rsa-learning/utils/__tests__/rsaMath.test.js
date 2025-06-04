import { gcd, modInverse, modPow, generateRSAProblem } from '../rsaMath.js';

describe('gcd', () => {
  test('calculates greatest common divisor correctly', () => {
    expect(gcd(15, 5)).toBe(5);
    expect(gcd(17, 12)).toBe(1);
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(24, 18)).toBe(6);
  });
});

describe('modInverse', () => {
  test('finds modular inverse where it exists', () => {
    expect(modInverse(3, 11)).toBe(4);
    expect(modInverse(10, 17)).toBe(12);
    expect(modInverse(7, 40)).toBe(23);
  });
});

describe('modPow', () => {
  test('computes modular exponentiation', () => {
    expect(modPow(2, 10, 1000)).toBe(24);
    expect(modPow(3, 0, 5)).toBe(1);
    expect(modPow(7, 2, 5)).toBe(4);
  });
});

describe('generateRSAProblem', () => {
  test('returns consistent RSA parameters', () => {
    const { p, q, n, phi, e, d } = generateRSAProblem();
    expect(n).toBe(p * q);
    expect(phi).toBe((p - 1) * (q - 1));
    expect(gcd(e, phi)).toBe(1);
    expect((e * d) % phi).toBe(1);
  });
});
