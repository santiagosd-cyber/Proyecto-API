const { passRegex } = require('../src/utils/validadores');

describe('Suite: Seguridad de Contraseñas', () => {

  test('1. Rechaza longitud menor a 8 caracteres', () => {
    expect(passRegex.test('A1bc')).toBe(false);
  });

  test('2. Rechaza si no tiene mayúscula', () => {
    expect(passRegex.test('abcdefg1')).toBe(false);
  });

  test('3. Rechaza si no tiene número', () => {
    expect(passRegex.test('Abcdefgh')).toBe(false);
  });

  test('4. Acepta una contraseña válida', () => {
    expect(passRegex.test('Abcdefg1')).toBe(true);
  });

});