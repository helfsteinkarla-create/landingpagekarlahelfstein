# 📊 Configuração do Google Sheets

## Problema Identificado

As credenciais do Google Service Account estão com valores placeholder. É necessário substituir pelo arquivo real.

## ✅ Passos para Configurar

### 1. Criar Service Account no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** → **Credentials**
4. Clique em **Create Credentials** → **Service Account**
5. Preencha os dados e clique em **Create**
6. Na tela de permissões, clique em **Continue** (sem adicionar roles)
7. Clique em **Done**

### 2. Gerar Chave JSON

1. Na lista de Service Accounts, clique no email da conta criada
2. Vá na aba **Keys**
3. Clique em **Add Key** → **Create new key**
4. Selecione **JSON** e clique em **Create**
5. O arquivo JSON será baixado automaticamente

### 3. Habilitar Google Sheets API

1. No Google Cloud Console, vá em **APIs & Services** → **Library**
2. Procure por "Google Sheets API"
3. Clique em **Enable**

### 4. Compartilhar Planilha com Service Account

1. Abra sua planilha do Google Sheets
2. Clique em **Compartilhar**
3. Adicione o email do Service Account (está no arquivo JSON baixado, campo `client_email`)
4. Dê permissão de **Editor**
5. Clique em **Enviar**

**Email do Service Account atual:**
```
landing-page-atma@landing-page-atma.iam.gserviceaccount.com
```

### 5. Substituir Credenciais

Substitua o conteúdo do arquivo `/home/ubuntu/landing-page-consorcio/google-credentials.json` pelo conteúdo do arquivo JSON baixado.

### 6. Verificar ID da Planilha

O ID da planilha atual configurado é:
```
14GSJih_l4_Ih1O-gBJMkhup5ukrLDdEpAgWCjJRFGMs
```

Você pode encontrar o ID na URL da planilha:
```
https://docs.google.com/spreadsheets/d/[ID_DA_PLANILHA]/edit
```

Se precisar alterar, edite o arquivo `/home/ubuntu/landing-page-consorcio/server/googleSheets.ts` na linha 8.

## 🧪 Testar Integração

Após configurar, teste o formulário na landing page. Os dados devem aparecer automaticamente na planilha.

## 📝 Estrutura da Planilha

A planilha terá as seguintes colunas:

| Data/Hora | Nome | Email | WhatsApp | Produtos de Interesse |
|-----------|------|-------|----------|----------------------|
| 22/10/2025 14:30 | João Silva | joao@email.com | (62) 98765-4321 | Compra de Veículo, Compra Imóvel |

## ⚠️ Importante

- Mantenha o arquivo `google-credentials.json` **seguro** e **nunca** o compartilhe publicamente
- O arquivo já está no `.gitignore` para não ser enviado ao GitHub
- Após configurar, reinicie o servidor de desenvolvimento

