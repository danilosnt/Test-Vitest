// 1. Importações
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils' // 'mount' "monta" o componente
import FormReserve from './form.vue' // O componente que vamos testar
import axios from 'axios'
import Swal from 'sweetalert2'

// 2. Mockar o módulo 'axios'
vi.mock('axios')

// 3. 'describe' agrupa nossos testes
describe('FormReserve.vue', () => {
  let wrapper: any // 'wrapper' é o nosso componente montado

  // 4. 'beforeEach' roda antes de CADA teste ('it')
  beforeEach(() => {
    vi.clearAllMocks() // Limpa os "espiões" (Swal, Axios)
    wrapper = mount(FormReserve, {
      props: { isActive: true }, 
    })
  })

  // 5. Nossos Casos de Teste ('it')

  // Teste 1: Renderização
  it('deve renderizar o formulário e todos os campos corretamente', () => {
    expect(wrapper.text()).toContain('Formulario para Reserva')
    expect(wrapper.find('input[label="Nome"]').exists()).toBe(true)
    expect(wrapper.find('input[label="Email"]').exists()).toBe(true)
    expect(wrapper.find('input[label="CPF"]').exists()).toBe(true)
    expect(wrapper.find('input[label="Telefone"]').exists()).toBe(true)
    expect(wrapper.find('input[label="Data da Reserva"]').exists()).toBe(true)
    expect(wrapper.find('input[label="Ambiente"]').exists()).toBe(true)
  })

  // Teste 2: Botão Cancelar
  it('deve emitir o evento "initReserve" com "false" ao clicar em Cancelar', async () => {
    const cancelButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Cancelar')

    await cancelButton.trigger('click') // Simula o clique

    expect(wrapper.emitted()).toHaveProperty('initReserve')
    expect(wrapper.emitted('initReserve')[0]).toEqual([false])
  })

  // Teste 3: Validação (Campos Vazios)
  it('não deve chamar axios.post se os campos estiverem vazios', async () => {
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')

    await reserveButton.trigger('click')

    // Verifica se o axios.post NÃO foi chamado
    expect(axios.post).not.toHaveBeenCalled()
  })

  // Teste 4: Submissão com Sucesso
  it('deve chamar axios.post com dados formatados e mostrar alerta de sucesso', async () => {
    // A. Prepara o Mock: Simula SUCESSO na chamada da API
    vi.mocked(axios.post).mockResolvedValue({ status: 200, data: {} })

    // B. Preenche o formulário
    await wrapper.find('input[label="Nome"]').setValue('Cliente Teste')
    await wrapper.find('input[label="Email"]').setValue('teste@valido.com')
    // Use um CPF que passe na sua validação (esse é um CPF gerado válido)
    await wrapper.find('input[label="CPF"]').setValue('123.456.789-00') 
    await wrapper.find('input[label="Telefone"]').setValue('(11)98765-4321')
    await wrapper
      .find('input[label="Data da Reserva"]')
      .setValue('2025-11-30T20:00')
    await wrapper.vm.Ambiente = 'Mezanino' // Seta o 'ref' 'Ambiente' diretamente

    // C. Clica em "Reservar"
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')
    await reserveButton.trigger('click')

    // D. Verifica as consequências
    expect(axios.post).toHaveBeenCalledTimes(1) // Foi chamado 1 vez?

    // Foi chamado com os dados FORMATADOS?
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/clientes', // A URL
      expect.objectContaining({ // O payload continha...
        Name: 'Cliente Teste',
        Cpf: '12345678900', // CPF sem máscara
        Phone: '11987654321', // Telefone sem máscara
        Ambiente: 'mezanino', // em minúsculo
      })
    )

    // O SweetAlert de SUCESSO apareceu?
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
      })
    )
  })

  // Teste 5: Submissão com Falha (Erro de API)
  it('deve mostrar alerta de erro se o axios.post falhar', async () => {
    // A. Prepara o Mock: Simula ERRO na chamada da API
    vi.mocked(axios.post).mockRejectedValue(new Error('Erro de rede'))

    // B. Preenche o formulário (igual ao teste anterior)
    await wrapper.find('input[label="Nome"]').setValue('Cliente Teste')
    await wrapper.find('input[label="Email"]').setValue('teste@valido.com')
    await wrapper.find('input[label="CPF"]').setValue('123.456.789-00')
    await wrapper.find('input[label="Telefone"]').setValue('(11)98765-4321')
    await wrapper
      .find('input[label="Data da Reserva"]')
      .setValue('2025-11-30T20:00')
    await wrapper.vm.Ambiente = 'Varanda'

    // C. Clica em "Reservar"
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')
    await reserveButton.trigger('click')

    // D. Verifica as consequências
    expect(axios.post).toHaveBeenCalledTimes(1) // Tentou chamar?

    // O SweetAlert de ERRO apareceu?
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        title: 'Oops...',
      })
    )

    // O formulário fechou (como está no seu 'catch')?
    expect(wrapper.emitted('initReserve')[0]).toEqual([false])
  })
})