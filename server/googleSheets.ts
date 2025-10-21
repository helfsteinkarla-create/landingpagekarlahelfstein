import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPREADSHEET_ID = '14GSJih_l4_Ih1O-gBJMkhup5ukrLDdEpAgWCjJRFGMs';
const CREDENTIALS_PATH = path.join(__dirname, '..', 'google-credentials.json');

interface LeadData {
  nome: string;
  email: string;
  whatsapp: string;
  produtos: string[];
}

export async function addLeadToGoogleSheets(leadData: LeadData): Promise<boolean> {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Verificar se a planilha tem cabeçalhos, se não, adicionar
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Página1!A1:E1',
    });

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      // Adicionar cabeçalhos
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Página1!A1:E1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Data/Hora', 'Nome', 'Email', 'WhatsApp', 'Produtos de Interesse']],
        },
      });
    }

    // Adicionar nova linha com os dados do lead
    const timestamp = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const produtosText = leadData.produtos.join(', ');

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Página1!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[timestamp, leadData.nome, leadData.email, leadData.whatsapp, produtosText]],
      },
    });

    console.log('[Google Sheets] Lead adicionado com sucesso:', response.data.updates);
    return true;
  } catch (error) {
    console.error('[Google Sheets] Erro ao adicionar lead:', error);
    return false;
  }
}

