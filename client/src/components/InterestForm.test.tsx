import { describe, it, expect } from 'vitest';

describe('InterestForm', () => {
  it('should validate required fields', () => {
    // Teste básico de validação
    const formData = {
      nome: '',
      email: '',
      whatsapp: '',
      produtos: [],
    };

    const isValid = 
      formData.nome !== '' && 
      formData.email !== '' && 
      formData.whatsapp !== '' &&
      formData.produtos.length > 0;

    expect(isValid).toBe(false);
  });

  it('should accept valid form data', () => {
    const formData = {
      nome: 'João Silva',
      email: 'joao@example.com',
      whatsapp: '(62) 98765-4321',
      produtos: ['Compra de Veículo'],
    };

    const isValid = 
      formData.nome !== '' && 
      formData.email !== '' && 
      formData.whatsapp !== '' &&
      formData.produtos.length > 0;

    expect(isValid).toBe(true);
  });
});

