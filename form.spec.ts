import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FormReserve from './form.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

// 1. Mockar o módulo 'axios'
vi.mock('axios')

// 2. 'describe' agrupa nossos testes
describe('FormReserve.vue', () => {
  let wrapper: any

  // 3. 'beforeEach'
  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mount(FormReserve, {
      props: { isActive: true },
    })
  })

  // 4. Nossos Casos de Teste ('it')

  // Teste 1: Renderização
  it('deve renderizar o formulário e todos os campos corretamente', () => {
    expect(wrapper.text()).toContain('Formulario para Reserva')
    expect(wrapper.find('input[label="Nome"]').exists()).toBe(true)
    expect(wrapper.find('input[label="Email"]').exists()).toBe(true)
    // ... (outros expects)
  })

  // Teste 2: Botão Cancelar
  it('deve emitir o evento "initReserve" com "false" ao clicar em Cancelar', async () => {
    const cancelButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Cancelar')

    await cancelButton.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('initReserve')
    expect(wrapper.emitted('initReserve')[0]).toEqual([false])
  })

  // Teste 3: Validação (Campos Vazios)
  it('não deve chamar axios.post se os campos estiverem vazios', async () => {
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')

    await reserveButton.trigger('click')
    expect(axios.post).not.toHaveBeenCalled()
  })

  // Teste 4: Submissão com Sucesso
  it('deve chamar axios.post com dados formatados e mostrar alerta de sucesso', async () => {
    vi.mocked(axios.post).mockResolvedValue({ status: 200, data: {} })

    // Preenche o formulário
    await wrapper.find('input[label="Nome"]').setValue('Cliente Teste')
    await wrapper.find('input[label="Email"]').setValue('teste@valido.com')
    await wrapper.find('input[label="CPF"]').setValue('123.456.789-00')
    await wrapper.find('input[label="Telefone"]').setValue('(11)98765-4321')
    await (wrapper.vm.FormattedDate.value = '2025-11-30T20:00')
    await (wrapper.vm.Ambiente.value = 'Mezanino')

    // Clica em "Reservar"
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')
    await reserveButton.trigger('click')

    // Verifica as consequências
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8080/clientes',
      expect.objectContaining({
        Name: 'Cliente Teste',
        Cpf: '12345678900',
        Phone: '11987654321',
        Ambiente: 'mezanino',
      })
    )
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'success',
      })
    )
  })

  // Teste 5: Submissão com Falha (Erro de API)
  it('deve mostrar alerta de erro se o axios.post falhar', async () => {
    vi.mocked(axios.post).mockRejectedValue(new Error('Erro de rede'))

    // Preenche o formulário
    await wrapper.find('input[label="Nome"]').setValue('Cliente Teste')
    await wrapper.find('input[label="Email"]').setValue('teste@valido.com')
    await wrapper.find('input[label="CPF"]').setValue('123.456.789-00')
    await wrapper.find('input[label="Telefone"]').setValue('(11)98765-4321')
    await (wrapper.vm.FormattedDate.value = '2025-11-30T20:00')
    await (wrapper.vm.Ambiente.value = 'Varanda')

    // Clica em "Reservar"
    const reserveButton = wrapper
      .findAll('button')
      .find((btn: any) => btn.text() === 'Reservar')
    await reserveButton.trigger('click')

    // Verifica as consequências
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: 'error',
        title: 'Oops...',
      })
    )
    expect(wrapper.emitted('initReserve')[0]).toEqual([false])
  })
})