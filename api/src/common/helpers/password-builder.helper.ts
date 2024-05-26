const UPPER_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVYXWZ'
const LOWER_LETTERS = 'abcdefghijklmnopqrstuvyxwz'
const INT_NUMBERS = '0123456789'
const SYMBOL_CHAR = '!@#$%¨&*()_+='

export function passwordBuilderHelper(size = 20): string {
  size = size < 10 ? 10 : size
  let password = UPPER_LETTERS.split('')
    .sort(() => 0.5 - Math.random())
    .join('')
  password += LOWER_LETTERS.split('')
    .sort(() => 0.5 - Math.random())
    .join('')
  password += INT_NUMBERS.split('')
    .sort(() => 0.5 - Math.random())
    .join('')
  password += SYMBOL_CHAR.split('')
    .sort(() => 0.5 - Math.random())
    .join('')

  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')
    .slice(0, size)
}
