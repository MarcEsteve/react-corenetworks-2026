const sum = require('./sum');

test('Suma 1 + 2 igual a 3', () => {
  expect(sum(1, 2)).toBe(3);
});