import { describe, it, expect } from 'vitest'
import { required, validEmail, validCpf, min11 } from '@/utils/validations'

describe('Funções de Validação', () => {
  it('UT-001: required - Campo vazio', () => {
    expect(required('')).toBe('Este campo é necessario.')
  })

  it('UT-002: required - Campo preenchido', () => {
    expect(required('Teste')).toBe(true)
  })

  it('UT-003: validEmail - Email inválido', () => {
    expect(validEmail('teste.com')).toBe('Email inválido.')
  })

  it('UT-004: validEmail - Email válido', () => {
    expect(validEmail('teste@teste.com')).toBe(true)
  })
})
