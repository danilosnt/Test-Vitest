export function required(value) {
  return value ? true : 'Este campo é necessario.'
}

export function validEmail(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value) ? true : 'Email inválido.'
}

export function validCpf(value) {
  const cpf = value.replace(/\D/g, '')
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return 'Este CPF não é válido.'
  }
  return true
}

export function min11(value) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 ? true : 'O CPF deve ter apenas 11 dígitos.'
}
