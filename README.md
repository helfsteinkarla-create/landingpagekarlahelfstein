# Landing Page - Karla Helfstein Consórcios

Landing page profissional para vendas de consórcio com design moderno inspirado no macOS 26 Liquid Glass.

## 🎨 Design

- **Estilo:** Liquid Glass com efeitos glassmorphism
- **Paleta:** Gradientes suaves (azul → roxo → rosa)
- **Animações:** Scroll reveal suaves
- **Responsivo:** Mobile, tablet e desktop

## ✨ Funcionalidades

### 📱 Seções

1. **Hero Section**
   - Nome e especialidade
   - Botões de redes sociais (WhatsApp, Instagram, YouTube)

2. **Vídeo Aulas**
   - 3 vídeos do YouTube incorporados
   - Layout em grid responsivo

3. **Formulário de Interesse**
   - Campos: Nome, Email, WhatsApp
   - Seleção múltipla de produtos
   - Validação completa

4. **Quem Sou Eu**
   - Apresentação profissional
   - Benefícios do consórcio
   - Depoimentos de clientes

5. **Footer**
   - Informações da empresa
   - Contatos
   - Links das redes sociais

### 🔧 Integrações

- ✅ **Google Sheets API** - Armazenamento automático de leads
- ✅ **WhatsApp** - Redirecionamento com mensagem pré-formatada
- ✅ **Email** - Notificações automáticas
- ✅ **Banco de Dados MySQL** - Backup de todos os leads

## 🚀 Tecnologias

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- tRPC
- shadcn/ui

**Backend:**
- Node.js
- Express 4
- tRPC 11
- Drizzle ORM
- MySQL/TiDB

**APIs:**
- Google Sheets API
- WhatsApp Business API
- YouTube Embed API

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Executar migrações do banco
pnpm db:push

# Iniciar servidor de desenvolvimento
pnpm dev
```

## 🔐 Configuração

### Google Sheets

1. Criar um projeto no Google Cloud Console
2. Habilitar Google Sheets API
3. Criar uma Service Account
4. Baixar as credenciais JSON
5. Salvar como `google-credentials.json` na raiz do projeto
6. Compartilhar a planilha com o email da Service Account

### Planilha

- **ID da Planilha:** `14GSJih_l4_Ih1O-gBJMkhup5ukrLDdEpAgWCjJRFGMs`
- **Nome da Aba:** `Página1`
- **Service Account:** `firebase-adminsdk-fbsvc@landing-page-atma.iam.gserviceaccount.com`

## 📊 Estrutura do Banco de Dados

### Tabela: leads

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID auto-incremento |
| nome | VARCHAR(255) | Nome completo |
| email | VARCHAR(320) | Email |
| whatsapp | VARCHAR(20) | WhatsApp |
| produtos | TEXT | JSON array de produtos |
| createdAt | TIMESTAMP | Data de criação |

## 📱 Informações de Contato

**Karla Helfstein**
- WhatsApp: (62) 98313-6222
- Email: karla@atmacorretora.com.br
- Instagram: @karlahelfstein
- YouTube: @karlahelfstein8196

**Atma Corretora de Seguros Ltda.**
- Endereço: R. Benedito Bueno, Chácara C, Vila São Simão
- Cidade: Indiara - GO, 75955-000

## 📝 Licença

© 2025 Karla Helfstein - Todos os direitos reservados

---

**Desenvolvido com ❤️ usando Manus AI**
