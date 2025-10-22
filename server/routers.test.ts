import { describe, it, expect } from 'vitest';
import { z } from 'zod';

// Schema de validação de lead (extraído do router)
const leadSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().min(1, 'WhatsApp é obrigatório'),
  produtos: z.array(z.string()).min(1, 'Selecione pelo menos um produto'),
});

describe('Lead Validation', () => {
  it('should validate correct lead data', () => {
    const validLead = {
      nome: 'Maria Silva',
      email: 'maria@example.com',
      whatsapp: '(62) 98765-4321',
      produtos: ['Compra de Veículo', 'Compra Imóvel para Morar'],
    };

    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it('should reject lead with invalid email', () => {
    const invalidLead = {
      nome: 'João Silva',
      email: 'invalid-email',
      whatsapp: '(62) 98765-4321',
      produtos: ['Compra de Veículo'],
    };

    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });

  it('should reject lead without products', () => {
    const invalidLead = {
      nome: 'Pedro Santos',
      email: 'pedro@example.com',
      whatsapp: '(62) 98765-4321',
      produtos: [],
    };

    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });

  it('should reject lead with empty name', () => {
    const invalidLead = {
      nome: '',
      email: 'teste@example.com',
      whatsapp: '(62) 98765-4321',
      produtos: ['Compra de Veículo'],
    };

    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });
});

